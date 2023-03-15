import { Observable, ObservableInput, switchMap } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

export type Options<T = any> = RequestInit & {
    observe?: 'body' | 'response',
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    selector?: (response: Response) => ObservableInput<T>;
}

const DEFAULTS = { mode: 'cors', observe: 'body', responseType: 'json' }

const defaults = <T>(opts: Options<T> = {}, method: string) =>
    ({ ...DEFAULTS, ...opts, method } as Required<Options>)

const request = (url: string | Request, opts: Required<Options<any>>) => {
    const resp = fromFetch(url, opts)
    switch (opts.observe) {
        case 'body':
            switch (opts.responseType) {
                case 'arraybuffer':
                    return resp.pipe(switchMap<Response, any>(res => res.arrayBuffer()))
                case 'blob':
                    return resp.pipe(switchMap<Response, any>(res => res.blob()))
                case 'text':
                    return resp.pipe(switchMap<Response, any>(res => res.text()))
                case 'json':
                default:
                    return resp.pipe(switchMap<Response, any>(res => res.json()))
            }
        case 'response':
            // The response stream was requested directly, so return it.
            return resp
        default:
            // Guard against new future observe types being added.
            throw new Error(`Unreachable: unhandled observe type ${opts.observe}}`)
    }
}

/** Fetch API over RxJS Observables. */
export class HttpRx {
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

    get(url: string | Request, opts?: Options<any>): Observable<any> {
        return request(url, defaults(opts, "GET"))
    }

    head(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "HEAD"))
    }

    post(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "POST"))
    }

    put(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "PUT"))
    }

    delete(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "DELETE"))
    }

    options(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "OPTIONS"))
    }

    trace(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "TRACE"))
    }

    patch(url: string | Request, opts?: Options): Observable<any> {
        return request(url, defaults(opts, "PATCH"))
    }
}
