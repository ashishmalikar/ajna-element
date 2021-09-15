# Iterations

Ajna Element gives build in support for list rendering, we can render list or array on page with ease.

#### Tempalte:

```html
<template>
  <div class="gds-container">
    <ul class="gds-list gds-ordered gds-dividing">
      <li for-each="fruitName in fruitNames">
        {{fruitName}}
      </li>
    </ul>
  </div>
</template>
```
#### Controller
```ts
import {AjnaElement} from "ajna";

export default class SampleListElement extends AjnaElement {
  constructor() {
    super();
  }

  data () {
    return {
      fruitNames: [
        "Banana",
        "Mango",
        "Apple"
      ]
    }
  }
}

```
