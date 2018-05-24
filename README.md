# ngx-oc-component

`ngx-oc-component` is an small Angular extension that facilitates the inclusion of any [OpenComponents](https://github.com/opencomponents/oc) in angular applications.

It was built for modern browsers using _TypeScript, CSS3 and HTML5_ and Angular `>=5.0.0`

## Installation
#### Install `ngx-oc-component` using [npm](https://www.npmjs.com/package/ngx-oc-component):
```sh
npm i ngx-oc-component --save
```

## Usage
#### 1. Include the oc-client in your HTML:
The [oc-client](https://github.com/opencomponents/oc/wiki/Browser-client) library is available inside your configured OC Registry. 
This can be achieved in multiple ways: 
 - ##### directly in `index.html`
```html
<script src="https://your-oc-registry.xyz/oc-client/client.js"></script>
```
or 
- ##### angular style (Note: it is recommended to include the sript in `ngAfterViewInit` method)
```ts
import {Component, Renderer2, Inject, AfterViewInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export class YourComponent implements AfterViewInit {
    private registry = 'https://your-oc-registry.xyz';
    constructor(private renderer: Renderer2, 
                @Inject(DOCUMENT) private document) { }

    public ngAfterViewInit(): void {
        const s = this.renderer.createElement('script');
        s.src = `${this.registry}/oc-client/client.js`;
        this.renderer.appendChild(this.document.body, s);
    }
}

```
#### 2. Import `OcModule` into your `AppModule` class
```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {OcModule} from 'ngx-oc-component/oc.module';

@NgModule({
    imports: [BrowserModule, OcModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {

}
```
#### 3. Build `OcOptions` for the template
```ts
import {OcOptions} from 'ngx-oc-component';

public ocOptions: OcOptions = {
    baseUrl: 'yourBaseRegistryUrl',
    name: 'yourComponentName',
    version: 'yourComponentVersion',
    parameters: yourAdditionalParameters
};
``` 
where `parameters: any`. 

Also, define a public method for `rendered` event
```ts
public onRendered(event) {
    /* your code */
}
```

#### 4. In template
```html
<ngx-oc-component [options]="ocOptions"
                  (rendered)="onRendered($event)">
</ngx-oc-component>
```
