import { Observable } from 'rxjs'

import { fetchFn, HandlerInterceptors } from './handler'
import { HttpInterceptor } from './interceptor'
import { defaults, HttpOptions } from './options'

/** HTTP `Fetch` API client over RxJS `Observables` inspired by Angular `HttpClient`. */
export class Http {
    private readonly handler = new HandlerInterceptors()

    intercept(interceptor: HttpInterceptor) {
        return this.handler.append(interceptor)
    }

    get(
        url: string | Request,
        opts: RequestInit & {
            responseType: 'arraybuffer',
        }
    ): Observable<ArrayBuffer>;
    get(
        url: string | Request,
        opts: RequestInit & {
            responseType: 'blob',
        }
    ): Observable<Blob>;
    get(
        url: string | Request,
        opts: RequestInit & {
            responseType: 'text',
        }
    ): Observable<string>;
    get(
        url: string | Request,
        opts: RequestInit & {
            responseType: 'json',
        }
    ): Observable<object>;
    get(
        url: string | Request,
        opts: RequestInit & {
            observe: 'response',
        }
    ): Observable<Response>;
    get<T>(
        url: string | Request,
        opts?: RequestInit & {
            observe?: 'body',
            responseType?: 'json',
        }
    ): Observable<T>;
    get(
        url: string | Request,
        opts: RequestInit & {
            observe?: 'body' | 'response',
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        }
    ): Observable<any>;

    get(url: string | Request, opts?: HttpOptions<any>): Observable<any> {
        return this.request(url, defaults(opts, 'GET'))
    }

    head(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'HEAD'))
    }

    post(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'POST'))
    }

    put(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'PUT'))
    }

    delete(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'DELETE'))
    }

    options(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'OPTIONS'))
    }

    trace(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'TRACE'))
    }

    patch(url: string | Request, opts?: HttpOptions): Observable<any> {
        return this.request(url, defaults(opts, 'PATCH'))
    }

    private request(url: string | Request, opts: Required<HttpOptions<any>>) {
        if (!opts.selector && opts.observe === 'body') {
            opts.selector = (resp) => {
                switch (opts.responseType) {
                    case 'arraybuffer':
                        return resp.arrayBuffer()
                    case 'blob':
                        return resp.blob()
                    case 'text':
                        return resp.text()
                    case 'json':
                    default:
                        return resp.json()
                    // return resp.pipe(
                    //     switchMap<Response, any>(res => {
                    //         if (res.ok) {
                    //             return of(res)
                    //         } else {
                    //             return throwError(() => new Error(`Error ${res.status}`))
                    //         }
                    //     }))
                }
            }
        }

        const req = typeof url === 'string' ? new Request(url) : url
        switch (opts.observe) {
            case 'body':
            case 'response':
                return this.handler.handle(req, fetchFn(opts))
            default:
                throw new Error(`Unreachable: unhandled observe type ${opts.observe}}`)
        }
    }
}
