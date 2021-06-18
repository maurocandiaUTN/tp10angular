import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Instrumento } from 'src/entidades/Instrumento';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-instrumento',
  templateUrl: './item-instrumento.component.html',
  styleUrls: ['./item-instrumento.component.css']
})
export class ItemInstrumentoComponent implements OnInit {

  @Input() instrumentoAux:Instrumento;
  @Input() index: number;
  @Output() instrumentoSeleccionado:EventEmitter<number>;//number es el index

  
  constructor(private router:Router) { 
    this.instrumentoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public verInstrumento(){

    console.log(this.index);
    //this.router.navigate(['/detalleInstrumento', this.index])
    this.instrumentoSeleccionado.emit(this.index);
  }

}
