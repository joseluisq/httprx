import { ObservableInput } from 'rxjs'

export type HttpOptions<T = any> = RequestInit & {
    observe?: 'body' | 'response',
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    selector?: (response: Response) => ObservableInput<T>;
}

const DEFAULTS = { mode: 'cors', observe: 'body', responseType: 'json' }

export const defaults = <T>(opts: HttpOptions<T> = {}, method: string) =>
    ({ ...DEFAULTS, ...opts, method } as Required<HttpOptions>)
