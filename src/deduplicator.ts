import { asapScheduler, finalize, Observable, scheduled, shareReplay } from 'rxjs'

import { HttpHandler } from './handler'
import { HttpInterceptor } from './interceptor'

class RequestEventMap {
    private readonly events = new Map<string, Observable<Response>>()

    get(req: Request) {
        return this.events.get(this.key(req))
    }

    insert(req: Request, event: Observable<Response>) {
        this.events.set(this.key(req), event)
    }

    remove(req: Request) {
        this.events.delete(this.key(req))
    }

    private key(req: Request) {
        return req.url
    }
}

const events = new RequestEventMap()

export class HttpRequestDeduplicator implements HttpInterceptor {
    intercept(req: Request, next: HttpHandler): Observable<Response> {
        const event = events.get(req)
        if (event) {
            return scheduled(event, asapScheduler)
        }
        const shared = next(req)
            .pipe(
                finalize(() => events.remove(req)),
                shareReplay(1)
            )
        events.insert(req, shared)
        return shared
    }
}
