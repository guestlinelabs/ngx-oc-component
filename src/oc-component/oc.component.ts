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
  template: `
    <ng-template></ng-template>
  `
})
export class OcComponent implements OnInit {
  @Input() public options: OcOptions;
  @Output() public rendered: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  public ngOnInit(): void {
    if (!this.options) {
      console.error('Missing OcOptions');
      return;
    }

    window['oc'] = window['oc'] || {};
    const oc = window['oc'];
    oc.cmd = oc.cmd || [];
    oc.cmd.push(function(oc) {
      const content = oc.build(this.options);
      const div = this.renderer.createElement('div');
      this.renderer.setProperty(div, 'innerHTML', content);
      this.renderer.appendChild(this.el.nativeElement, div);
      oc.events.on('oc:rendered', (event, data) => {
        this.rendered.emit({ event, data });
      });
      oc.renderUnloadedComponents();
    });
  }
}
