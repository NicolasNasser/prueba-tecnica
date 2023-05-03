import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Activity } from 'src/models/activity.model';

@Component({
  selector: 'app-random-activity',
  templateUrl: './random-activity.component.html',
  styleUrls: ['./random-activity.component.css'],
})
export class RandomActivityComponent implements OnInit {
  randomActivity: Activity | undefined = undefined;
  error: string | undefined = undefined;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    /**Utilizo setTimeout() para esperar 5 segundos antes de hacer la petición y mostrar un mensaje de "Cargando...".  */
    setTimeout(() => {
      /**Se obtiene una actividad aleatoria usando RxJS */
      this.api.getRandomActivity().subscribe(
        (resp) => {
          this.randomActivity = resp;
        },
        (err) => {
          /**En caso de que se produzca un error, lo guardo para mostrarlo en pantalla */
          this.error = err;
        }
      );
    }, 5000);
  }
}
