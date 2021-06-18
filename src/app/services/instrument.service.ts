import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as  data from 'src/assets/datos/instrumentos.json';
import { Instrumento } from 'src/entidades/Instrumento';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  //instrumentosFile:any  = (data  as  any).default;

  public instrumentosData: Instrumento[] = [];
  public instrumentoEncontrado: Instrumento;

  constructor(private http: HttpClient) {
    console.log("service cargado");
    //console.log(this.instrumentosFile);
  }



  public getInstrumentos(): any[] {
    return this.instrumentosData;
  }

  public getInstrumentoXId(idx: string): any {
    for (let instrumento of this.instrumentosData) {
      if (instrumento.id == idx) {
        return instrumento;
      }
    }
  }

  //lee todos los platos
  getInstrumentoFromDataBase() {
    return this.http.get("http://localhost:8081/WebAppServer/RestoServlet?action = listar").pipe(
      map(instrumentosData => instrumentosData));
  }

  //busca un plato por el id
  getInstrumentoEnBaseDatosXId(idx: string) {
    return this.http.get("http://localhost:8081/WebAppServer/RestoServlet?action = buscar & idPlato=" + idx).pipe(
      map(instrumentoEncontrado => instrumentoEncontrado));
  }

  /*
  //busca los platos por un terminode busqueda
  getInstrumentoBusquedaFromDataBase(termino: string) {
    return this.http.get("http://localhost:8081/WebAppServer/RestoServlet?action = busqueda & termino=" + termino).pipe(
 map(instrumentoSearch => instrumentoSearch));
  }
  */

  instrumentoAdminUrl: string = "http://localhost:8081/WebAppServer/RestoServlet";
  newInstrumento(instrumentoNuevo: Instrumento) {
    return this.http.post<Instrumento>(this.instrumentoAdminUrl, null, {
      params: new HttpParams()
        .set("action", "insertar")
        .set("id", "0")
        .set("istrumento", instrumentoNuevo.instrumento)
        .set("marca", instrumentoNuevo.marca)
        .set("modelo", instrumentoNuevo.modelo).
        set("precio", instrumentoNuevo.precio)
    }).pipe(map(instrumentoNuevo => {
      console.log(instrumentoNuevo.instrumento);
      return instrumentoNuevo;
    }));
  }

  updatePlato(instrumentoUpdate: Instrumento) {
    return this.http.post<Instrumento>(this.instrumentoAdminUrl, null, {
      params: new HttpParams()
        .set("action", "actualizar")
        .set("id", instrumentoUpdate.id)
        .set("instrumento", instrumentoUpdate.instrumento)
        .set("marca", instrumentoUpdate.marca)
        .set("modelo", instrumentoUpdate.modelo)
        .set("precio", instrumentoUpdate.precio)
        
    }).pipe(map(res => {
      console.log(res.instrumento);
      return res;
    }));
  }


  deleteInstrumento(idInstrumento: string) {
    return this.http.post(this.instrumentoAdminUrl, null, {
      params: new HttpParams(
      )
      .set("action", "eliminar")
      .set("id", idInstrumento)
    })
      .pipe(
        map(res => {
          console.log(res);
          return res;
        }));
  }

}
