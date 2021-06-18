import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {InstrumentService} from 'src/app/services/instrument.service';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.css']
})
export class InstrumentosComponent implements OnInit {

  instrumArray:any[]= [];
  loading = true;


  constructor(private servicioInstrumento:InstrumentService, private router: Router) { }

/*
  ngOnInit(): void {

    this.instrumArray= this.servicioInstrumento.getInstrumentos();
    console.log(this.instrumArray);
  }
*/
  ngOnInit(): void {
    this.servicioInstrumento.getInstrumentoFromDataBase()
      .subscribe(dataInstrumento => {
        for (let instrumento in dataInstrumento) {
          this.instrumArray.push(dataInstrumento[instrumento]);
        }
        this.loading = false;
      });
  }

  public verInstrumento(idx:string){
    console.log("ID INSTRUMENTO " + idx);
    this.router.navigate(['/detalleInstrumento', idx])
  }

 
  envio(envio:string){
    if (envio == 'G') {
            
            
      return true;
  }else{
      return false;
  }
  }

}
