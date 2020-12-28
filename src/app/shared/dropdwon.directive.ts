import { Directive, HostListener, HostBinding, Injectable } from '@angular/core';

@Directive({
    selector: '[appDropdwonlist]'
})
export class DropDowinList{

   @HostBinding('class.open') isopen=false;
    @HostListener('click') toggle(){
       this.isopen=!this.isopen;
    }
}