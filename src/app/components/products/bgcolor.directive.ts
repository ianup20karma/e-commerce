import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BgColorDirective {
  constructor(private el: ElementRef) { }

  @Input() bgColor = "";

  @HostListener("mouseenter") onMouseEnter() {
    this.changeBgColor(this.bgColor);
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.changeBgColor("white");
  }
  private changeBgColor(bgColor: string) {
    this.el.nativeElement.style.backgroundColor = bgColor;
  }
}
