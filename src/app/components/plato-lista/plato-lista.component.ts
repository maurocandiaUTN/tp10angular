import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instrument.service';
import { Instrumento } from 'src/entidades/Instrumento';

@Component({
  selector: 'app-plato-lista',
  templateUrl: './plato-lista.component.html',
  styleUrls: ['./plato-lista.component.css']
})
export class PlatoListaComponent implements OnInit {

  instrumentos: Instrumento[] = [];
  loading = true;

  constructor(private servicioInstrumento: InstrumentService, private router: Router) {

  }
  ngOnInit() {
    this.servicioInstrumento.getInstrumentoFromDataBase()
      .subscribe(data => {
        console.log(data);
        for (let instrumento in data) {
          console.log(data[instrumento]);
          this.instrumentos.push(data[instrumento]);
        }
        this.loading = false;

      });
  }
  delete(idInstrumento: string) {
    var opcion = confirm("Esta seguro que desea eliminar el instrumento?");
    if (opcion == true) {
      this.servicioInstrumento.deleteInstrumento(idInstrumento)
        .subscribe(data => {
          console.log(data);
          location.reload();
        });
    }

  }
}


