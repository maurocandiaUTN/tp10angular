import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {InstrumentService} from 'src/app/services/instrument.service'; 
import { Instrumento } from 'src/entidades/Instrumento';

@Component({
  selector: 'app-detalle-instrumento',
  templateUrl: './detalle-instrumento.component.html',
  styleUrls: ['./detalle-instrumento.component.css']
})
export class DetalleInstrumentoComponent implements OnInit {

  //instrumento: any;
  instrumento:Instrumento;

  /*
  constructor(private activatedRoute:ActivatedRoute, private servicioInstrumento:InstrumentService) {
   // console.log("ID PARAM " + this.activatedRoute.params['id']);
    this.activatedRoute.params.subscribe(params =>{
      console.log(params['id'])
      this.instrumento = this.servicioInstrumento.getInstrumentoXId(params['id'])
    }) 
  }
  */

  constructor(private activatedRoute: ActivatedRoute, private servicioInstrumento:InstrumentService) {

    this.activatedRoute.params.subscribe(params => {
      this.servicioInstrumento.getInstrumentoEnBaseDatosXId(params['id'])
        .subscribe(instrumentoEncontrado => {
          this.instrumento = instrumentoEncontrado as Instrumento;
        });
    })
  }



  envio(envio:string){
    if (envio == 'G') {

      return true;
  }else{
      return false;
  }
  }
  ngOnInit(): void {
  }
   }

 


