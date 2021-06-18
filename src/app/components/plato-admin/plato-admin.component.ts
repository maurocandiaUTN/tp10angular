import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instrument.service';
import { Instrumento } from 'src/entidades/Instrumento';

@Component({
  selector: 'app-plato-admin',
  templateUrl: './plato-admin.component.html',
  styleUrls: ['./plato-admin.component.css']
})
export class PlatoAdminComponent implements OnInit {

  instrumento: Instrumento = {
    id: "0",
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: "",
    costoEnvio: "",
    cantidadVendida: "",
    descripcion: ""
  };
  new = false;
  idinstrumento: string;
  resultadoOperacion = "";

  constructor(private servicioInstrumento: InstrumentService, private router: Router,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.params
      .subscribe(
        parametros => {
          this.idinstrumento = parametros['id'];
          if (this.idinstrumento != "nuevo") {
            servicioInstrumento.getInstrumentoEnBaseDatosXId(this.idinstrumento)
              .subscribe(instrumentoEncontrado => this.instrumento = instrumentoEncontrado as Instrumento);
          } else {
            console.log("ES NUEVO");
          }
        }
      );
  }
  ngOnInit() {
  }
  save() {
    if (this.idinstrumento === 'nuevo') {

      console.log('nuevo');
      this.servicioInstrumento.newInstrumento(this.instrumento)
        .subscribe(data => {
          if (data && data.id) {
            this.resultadoOperacion = "Operación finalizada con exito";
            this.router.navigate(['/admin', data.id]);
          } else {
            this.resultadoOperacion = "Error en la operación, verifique los datos";
          }
        },
          error => console.error(error));
    } else {
      console.log(`Update ${this.idinstrumento}`);
      this.servicioInstrumento.updateInstrumento(this.instrumento)
        .subscribe(data => {
          if (data && data.id) {
            this.resultadoOperacion = "Operación finalizada con exito";
            console.log(data);
          } else {
            this.resultadoOperacion = "Error en la operación, verifique los datos";
          }
        },
          error => console.error(error));
    }
  }
  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      id: "0",
      instrumento: "",
      marca: "",
      modelo: "",
      imagen: "",
      precio: "",
      costoEnvio: "",
      cantidadVendida: "",
      descripcion: ""
    });
  }




}


