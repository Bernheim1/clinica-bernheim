import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBotonHistoriaClinica]'
})
export class BotonHistoriaClinicaDirective implements OnInit{

  @Input() appBotonHistoriaClinica : any;

  constructor(private el: ElementRef, private renderer : Renderer2) { 
  }

  ngOnInit() {
    console.log(this.appBotonHistoriaClinica)
    if(this.appBotonHistoriaClinica.historiaClinica == null || this.appBotonHistoriaClinica.historiaClinica.length == 0){
      this.cambiarEstado();
    }
  }

  cambiarEstado(){
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
  }

}
