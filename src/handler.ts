import { Observable } from 'rxjs'
import { chainFn, HttpInterceptor, InterceptorFn } from './interceptor'

export type HttpHandler = (reqMut: Request) => Observable<Response>

export class HandlerInterceptors {
    private readonly interceptors: InterceptorFn[] = []

    append(interceptor: HttpInterceptor) {
        return this.interceptors.push((req: Request, next: HttpHandler) => interceptor.intercept(req, next))
    }

    handle(req: Request, fetchFn: HttpHandler): Observable<Response> {
        const chain = this.interceptors.reduceRight(
            (chainedInterceptorFn, interceptorFn) => chainFn(chainedInterceptorFn, interceptorFn),
        )
        return chain(req, fetchFn)
    }
}
