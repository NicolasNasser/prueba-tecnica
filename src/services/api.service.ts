import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Activity } from 'src/models/activity.model';
import { map, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  url = 'https://www.boredapi.com/api/';

  getRandomActivity() {
    return this.http.get<Activity>(this.url + 'activity').pipe(
      /**Utilizo el operador map de la librería RxJS para editar el objeto y mostrar el precio con un diez por ciento adicional. */
      map((resp) => {
        /**Utilizo Object.assign para guardar una copia del objeto original y poder imprimirlo en la consola. */
        let activityConsoleShow: Activity = Object.assign({}, resp);
        console.log(activityConsoleShow, 'Objeto antes de editar el precio');
        resp.price = resp.price * 1.1;
        /**cambio el formato del precio para que tenga el siguiente ###,## */
        resp.price = +resp.price.toFixed(2);
        return resp;
      }),
      /**Utilizo el operador catchError() y throwError() de RxJS para controlar los errores en caso de que se pierda la conexión durante la llamada.  */
      catchError((error: HttpErrorResponse) => {
        return throwError(() => 'Error: Verifique su conexión a Internet.');
      })
    );
  }
}
