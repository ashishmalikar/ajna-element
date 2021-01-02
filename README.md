# Ajna Element

#### SampleElement.html
```html
<template>
  <div id="App" class="App">
    <header>Welcome {{name}}</header>
    <hds-button @click="handleClick" label="Click Here"><hds-button>
  </div>
</template>
```

#### SampleElement.css
``` css
.App {
  background-color: #e5e4e2;
}
```

#### SampleComponent.js
``` javascript
import { AjnaElement, data } from 'ajna';

export default class SampleElement extends AjnaElement {
  
  @data
  name = "My Name";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  plugins ( ) {
    return [

    ]
  }

  template () {
    return require('./SampleElement.html');
  }

  style () {
    return require('./SampleElement.css');
  }

  handleClick () {
    console.log("handling Click Event");
  }

}

window.customElements.define('sample-component', SampleComponent)

```