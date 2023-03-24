import { Observable } from 'rxjs'

import { HttpHandler, HttpRequest, HttpResponse } from './types'

/** It defines an implementation of an HTTP interceptor. */
export interface HttpInterceptor {
    /**
     * It identifies and handles a given HTTP request.
     *
     * @param req The outgoing request object to handle.
     * @param next The next interceptor in the chain or the final request if no interceptors remain.
     */
    intercept(req: HttpRequest, next: HttpHandler): Observable<HttpResponse>
}

export type InterceptorFn = (
    req: HttpRequest,
    next: HttpHandler
) => Observable<HttpResponse>
