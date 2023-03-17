// import { catchError, of } from 'rxjs'
import { Observable } from 'rxjs'
import { Http, HttpHandler, HttpInterceptor } from '../src'

class Interceptor1 implements HttpInterceptor {
    intercept(req: Request, next: HttpHandler): Observable<Response> {
        console.log("first interceptor!")
        return next(req)
    }
}

class Interceptor2 implements HttpInterceptor {
    intercept(req: Request, next: HttpHandler): Observable<Response> {
        console.log("second interceptor!")
        return next(req)
    }
}

interface Repository {
    id: number,
    name: string,
    description: string,
    html_url: string,
}

const http$ = new Http()
http$.intercept(new Interceptor1())
http$.intercept(new Interceptor2())

const ob = http$.get<Repository>('https://api.github.com/repos/static-web-server/static-web-server')
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
