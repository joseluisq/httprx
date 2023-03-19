import { Observable } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

import { chainFn, HttpInterceptor, interceptorChainEndFn, InterceptorFn } from './interceptor'
import { HttpOptions } from './options'

export type HttpHandler = (reqMut: Request) => Observable<Response>

export const fetchFn = (opts: Required<HttpOptions<any>>): HttpHandler => (reqMut) => fromFetch(reqMut, opts)

export class HandlerInterceptors {
    private readonly interceptors: InterceptorFn[] = []

    append(interceptor: HttpInterceptor) {
        return this.interceptors.push((req: Request, next: HttpHandler) => interceptor.intercept(req, next))
    }

    handle(req: Request, fetchFn: HttpHandler): Observable<Response> {
        const chain = this.interceptors.reduceRight(
            (chainedInterceptorFn, interceptorFn) => chainFn(chainedInterceptorFn, interceptorFn),
            interceptorChainEndFn
        )
        return chain(req, fetchFn)
    }
}
