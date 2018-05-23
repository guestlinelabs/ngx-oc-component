# ngx-oc-component

`ngx-oc-component` is an small Angular extension that facilitates the inclusion of any [OpenComponents](https://github.com/opencomponents/oc) in angular applications.

It was built for modern browsers using _TypeScript, CSS3 and HTML5_ and Angular `>=5.0.0`

## Usage
#### 1. Install `ngx-oc-component` using [npm](https://www.npmjs.com/package/@guestlinelabs/ngx-oc-component):
```sh
npm i ngx-oc-component --save
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
import {OcOptions} from 'ngx-oc-component/oc-options';

public ocOptions: OcOptions = {
    baseUrl: 'yourBaseRegistryUrl',
    name: 'yourComponentName',
    version: 'yourComponentVersion',
    parameters: yourAdditionalParameters'
};
``` 
where `parameters: any`

#### 4. In template
```html
<ngx-oc-component [options]="ocOptions"
                  (rendered)="onRendered($event)">
</ngx-oc-component>
```
