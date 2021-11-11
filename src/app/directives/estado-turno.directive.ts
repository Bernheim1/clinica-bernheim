import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEstadoTurno]'
})
export class EstadoTurnoDirective {

  /* 
  Utilizado en: 
    tabla-turnos-administrador.component.html = linea 25
    tabla-turnos-especialista.component.html = linea 34
    tabla-turnos-paciente.component.html = linea 34
  */


  @Input() appEstadoTurno : any;

  constructor(private el: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.appEstadoTurno == 'Estado: Aceptado'){
      this.cambiarColor('3px solid green')
    }else if(this.appEstadoTurno == 'Estado: Sin aceptar'){
      this.cambiarColor('3px solid grey')
    }else if(this.appEstadoTurno == 'Estado: Cancelado'){
      this.cambiarColor('3px solid red')
    }else if(this.appEstadoTurno == 'Estado: Realizado'){
      this.cambiarColor('3px solid blue')
    }else if(this.appEstadoTurno == 'Estado: Rechazado'){
      this.cambiarColor('3px solid yellow')
    }
    
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColor('1px solid white');
  }

  cambiarColor(color : string){
    this.el.nativeElement.style.border = color;
  }


}
