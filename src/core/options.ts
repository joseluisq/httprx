import { ObservableInput } from 'rxjs'

/** It defines options for an HTTP request method. */
export type HttpOptions<T> = RequestInit & {
    observe?: 'body' | 'response'
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
    selector?: (response: Response) => ObservableInput<T>
}

/** @internal */
const DEFAULTS = { mode: 'cors', observe: 'body', responseType: 'json' }

/** @internal */
export const defaults = <T>(opts: HttpOptions<T> = {}, method: string) =>
    ({
        ...DEFAULTS,
        ...opts,
        method,
    } as const)
