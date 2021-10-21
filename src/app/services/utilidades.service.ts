import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private toastr : ToastrService) { }

  mostrarToastError(titulo : string, mensaje : string){

    this.toastr.error(mensaje, titulo);

  }

  mostrarToastSuccess(titulo : string, mensaje : string){

    this.toastr.success(mensaje, titulo);

  }

  
}
