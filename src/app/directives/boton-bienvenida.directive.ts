import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBotonBienvenida]'
})
export class BotonBienvenidaDirective {

  constructor(private el: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor('#8460c4')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColor('grey');
  }

  cambiarColor(color : string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
