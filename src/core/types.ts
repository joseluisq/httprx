import { Observable } from 'rxjs'

/**
 * An `HttpHandler` instance dispatches requests
 * to the first interceptor in the chain, which dispatches then
 * to the second one and so on reaching the final `fetch` request eventually.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 */
export type HttpHandler = (reqMut: HttpRequest) => Observable<HttpResponse>

/**
 * The `Request` interface of the Fetch API represents a resource request.
 *
 * Type alias of the Fetch API {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Request}.
 */
export type HttpRequest = Request

/**
 * The `Response` interface of the Fetch API represents the response to a request.
 *
 * Type alias of the Fetch API {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}.
 */
export type HttpResponse = Response
