# Reactive HTTP

> HTTP [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) over [RxJS Observables](https://rxjs.dev/guide/overview).

## Install

```
npm install reactive-http
```

## Usage

```ts
// import { catchError, of } from 'rxjs'
import { HttpRx } from 'reactive-http'

const http$ = new HttpRx()

interface Response {
    id: number,
    name: string,
    description: string,
    html_url: string,
}

const ob = http$.get<Response>('https://api.github.com/repos/static-web-server/static-web-server')
// .pipe(
//     catchError(err => {
//         console.error(err)
//         return of({ error: false, message: err.message })
//     })
// )

ob.subscribe(resp => {
    console.log('id:', resp.id)
    console.log('name:', resp.name)
    console.log('description:', resp.description)
})
```
