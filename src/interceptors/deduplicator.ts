import {
    asapScheduler,
    finalize,
    Observable,
    scheduled,
    shareReplay,
} from 'rxjs'

import { HttpInterceptor } from '../core/interceptor'
import { HttpHandler, HttpRequest, HttpResponse } from '../core/types'

class RequestEventMap {
    private readonly events = new Map<string, Observable<HttpResponse>>()

    get(req: HttpRequest): Observable<Response> | undefined {
        return this.events.get(this.key(req))
    }

    insert(req: HttpRequest, event: Observable<HttpResponse>): void {
        this.events.set(this.key(req), event)
    }

    remove(req: HttpRequest): void {
        this.events.delete(this.key(req))
    }

    private key(req: HttpRequest): string {
        return req.url
    }
}

const events = new RequestEventMap()

/**
 * An interceptor able to deduplicate identical HTTP requests
 * in oder to be performed once. Meaning that all subscribers will be notified
 * when the deduplicated request is finished, reusing its response.
 *
 * Note that this interceptor only keeps track of URL occurrences in-memory
 * instead of caching data requests of some sort.
 */
export class HttpRequestDeduplicator implements HttpInterceptor {
    intercept(req: HttpRequest, next: HttpHandler): Observable<HttpResponse> {
        const event = events.get(req)
        if (event) return scheduled(event, asapScheduler)
        const shared = next(req).pipe(
            finalize(() => events.remove(req)),
            shareReplay(1)
        )
        events.insert(req, shared)
        return shared
    }
}
