import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
  constructor(private el: ElementRef) { }

  @Input() color = "";

  @HostListener("mouseenter") onMouseEnter() {
    this.changeColor(this.color);
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.changeColor("white");
  }
  private changeColor(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
