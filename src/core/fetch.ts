import { fromFetch } from 'rxjs/fetch'

import { HttpOptions } from './options'
import { HttpHandler } from './types'

/** `Fetch` API intended to perform a final HTTP request. */
export const fetchFn =
    <T>(opts: HttpOptions<T>): HttpHandler =>
        (reqMut) =>
            fromFetch(reqMut, opts)
