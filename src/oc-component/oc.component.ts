import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { OcOptions } from './oc-options';

@Component({
  selector: 'ngx-oc-component',
  template: `<ng-template></ng-template>`
})
export class OcComponent implements OnInit {
  @Input() public options: OcOptions;
  @Output() public rendered: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2,
              private el: ElementRef) {}

  public ngOnInit(): void {
    const oc = window['oc'];
    if (!this.options || !oc) {
      this.rendered.emit();
      return;
    }

    const content = oc.build(this.options);
    const div = this.renderer.createElement('div');
    this.renderer.setProperty(div, 'innerHTML', content);
    this.renderer.appendChild(this.el.nativeElement, div);

    oc.events.on('oc:rendered', (data) => { this.rendered.emit(data); });
    oc.renderUnloadedComponents();
  }
}
