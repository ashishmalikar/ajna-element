# Ajna Element

#### SampleElement.html
```html
<template>
  <div id="App" class="App">
    <header>Welcome {{name}}</header>
    <hds-button @click={this.handleClick} label="Click Here"><hds-button>
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
import { AjnaElement } from 'ajna';

export default class SampleElement extends AjnaElement {
  
  data () {
    return {
      name: "Ashish"
    }
  }

  constructor() {
    super();
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

```