import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBotonBienvenida]'
})
export class BotonBienvenidaDirective {

  /* 
  Utilizado en: 
    bienvenida.component.html = lineas 58-83
  */


  constructor(private el: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor('#8460c4')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColor('white');
  }

  cambiarColor(color : string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
