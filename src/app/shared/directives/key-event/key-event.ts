import { Directive, HostListener, Input, input, output, signal } from '@angular/core';

@Directive({
  selector: '[appKeyEvent]',
})
export class KeyEvent {

  appKeyEvent = input.required<string | number>()
  ctrl = input<boolean>(false)
  shift = input<boolean>(false)
  alt = input<boolean>(false)

  event = output<string>()

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent): void {

    const key = event.key
    const keyClicked = event.key == this.appKeyEvent()

    const ctrlNeededAndClicked = this.ctrl() && event.ctrlKey
    const shiftNeededAndClicked = this.shift() && event.shiftKey
    const altNeededAndClicked = this.alt() && event.altKey

    const emit = () => {
      event.preventDefault()
      this.event.emit(key);
    }

    if (keyClicked) {
      if(!this.ctrl() && !this.shift() && !this.alt() && !event.ctrlKey && !event.shiftKey && !event.altKey){
        emit()
      } else if(ctrlNeededAndClicked || shiftNeededAndClicked || altNeededAndClicked) {
        emit()
      }
    }
  }
}
