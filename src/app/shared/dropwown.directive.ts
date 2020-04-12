import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropwown]'
})
export class DropwownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
