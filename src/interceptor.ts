import { Observable } from 'rxjs'
import { HttpHandler } from './handler'

export interface HttpInterceptor {
    intercept(req: Request, next: HttpHandler): Observable<Response>
}

export type InterceptorFn = (req: Request, next: HttpHandler) => Observable<Response>

export function chainFn(chainTailFn: InterceptorFn, interceptorFn: InterceptorFn): InterceptorFn {
    return (initialRequest, finalHandlerFn) =>
        interceptorFn(
            initialRequest,
            downstreamRequest => chainTailFn(downstreamRequest, finalHandlerFn)
        )
}
