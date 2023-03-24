import { Observable } from 'rxjs'

import { defaults, HttpOptions } from './options'
import { HttpRequest, HttpResponse } from './types'
import { HttpInterceptor } from './interceptor'
import { Chain } from './chain'
import { fetchFn } from './fetch'

/**
 * HTTP {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API} client
 * over {@linkcode https://rxjs.dev/guide/overview RxJS Observables}
 * inspired by {@linkcode https://angular.io/api/common/http/HttpClient Angular HttpClient}.
 */
export class Http {
    private readonly chain = new Chain()

    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    get<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    get(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>

    /** It sends an `GET` HTTP request */
    get<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'GET') as HttpOptions<T>)
    }

    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    head<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    head(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>

    /** It sends an `HEAD` HTTP request */
    head<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'HEAD') as HttpOptions<T>)
    }

    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    post<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    post(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `POST` HTTP request */
    post<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'POST') as HttpOptions<T>)
    }

    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    put<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    put(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `PUT` HTTP request */
    put<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'PUT') as HttpOptions<T>)
    }

    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    delete<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    delete(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `DELETE` HTTP request */
    delete<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'DELETE') as HttpOptions<T>)
    }

    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    options<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    options(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `OPTIONS` HTTP request */
    options<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'OPTIONS') as HttpOptions<T>)
    }

    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    trace<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    trace(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `TRACE` HTTP request */
    trace<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'TRACE') as HttpOptions<T>)
    }

    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'arraybuffer'
        }
    ): Observable<ArrayBuffer>
    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'blob'
        }
    ): Observable<Blob>
    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'text'
        }
    ): Observable<string>
    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            responseType: 'json'
        }
    ): Observable<object>
    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe: 'response'
        }
    ): Observable<Response>
    patch<T>(
        url: string | HttpRequest,
        opts?: RequestInit & {
            observe?: 'body'
            responseType?: 'json'
        }
    ): Observable<T>
    patch(
        url: string | HttpRequest,
        opts: RequestInit & {
            observe?: 'body' | 'response'
            responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
        }
    ): Observable<unknown>
    /** It sends an `PATCH` HTTP request */
    patch<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T> = {}
    ): Observable<T | HttpResponse> {
        return this.request(url, defaults(opts, 'PATCH') as HttpOptions<T>)
    }

    /**
     * It appends an interceptor (or an array) to the interceptors chain.
     *
     * Interceptors can transform the outgoing request
     * before passing it to the next interceptor in the chain
     * by calling `next(transformedReq)`.
     *
     * An interceptor may also transform the response event stream,
     * by applying additional {@link https://rxjs.dev/guide/operators RxJS operators}
     * on the stream returned by `next()`.
     *
     * **Note:** interceptors are wrapped right-to-left so that final execution order is left-to-right.
     * E.g. if `interceptors` is the array `[a, b, c]` then the chain produced is conceptually `c(b(a(end)))`,
     * which is built from the inside out.
     *
     * @param interceptor New interceptor(s) to add to the interceptor's list.
     **/
    intercept(interceptor: HttpInterceptor | HttpInterceptor[]): void {
        if (Array.isArray(interceptor)) {
            interceptor.forEach((inter) => this.chain.append(inter))
            return
        }
        this.chain.append(interceptor)
        return
    }

    private request<T>(
        url: string | HttpRequest,
        opts: HttpOptions<T>
    ): Observable<Response> {
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
                }
            }
        }

        const req = typeof url === 'string' ? new Request(url) : url
        switch (opts.observe) {
        case 'body':
        case 'response':
            return this.chain.handle(req, fetchFn(opts))
        default:
            throw new Error('Unreachable: unhandled opts.observe type')
        }
    }
}
