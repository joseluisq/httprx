import { Observable } from 'rxjs'

import { HttpHandler, HttpRequest, HttpResponse } from './types'
import { HttpInterceptor, InterceptorFn } from './interceptor'

/** @internal */
function chainFn(
    chainTailFn: InterceptorFn,
    interceptorFn: InterceptorFn
): InterceptorFn {
    return (initialRequest, finalHandlerFn) =>
        interceptorFn(initialRequest, (downstreamRequest) =>
            chainTailFn(downstreamRequest, finalHandlerFn)
        )
}

/** @internal */
const interceptorChainEndFn = (
    req: HttpRequest,
    finalHandlerFn: HttpHandler
): Observable<Response> => finalHandlerFn(req)

/**
 * It manages a pool of HTTP interceptors in a chain,
 * dispatching the final `fetch` request when no interceptors remain.
 *
 * **Note:** interceptors are wrapped right-to-left so that final execution order is left-to-right.
 * E.g. if an `interceptors` array is `[a, b, c]` then the chain produced is conceptually `c(b(a(end)))`,
 * which is built from the inside out.
 *
 * @internal
 */
export class Chain {
    private readonly interceptors: InterceptorFn[] = []

    append(interceptor: HttpInterceptor): void {
        this.interceptors.push((req: HttpRequest, next: HttpHandler) =>
            interceptor.intercept(req, next)
        )
        return
    }

    handle(req: HttpRequest, fetchFn: HttpHandler): Observable<HttpResponse> {
        const chain = this.interceptors.reduceRight(
            (chainedInterceptorFn, interceptorFn) =>
                chainFn(chainedInterceptorFn, interceptorFn),
            interceptorChainEndFn
        )
        return chain(req, fetchFn)
    }
}
