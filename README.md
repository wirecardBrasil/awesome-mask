The awesome-mask runs with `Vue.js` and uses the `vanilla-masker` to make your form awesome with masks.
![Download Count](https://img.shields.io/npm/dt/awesome-mask.svg)
![Npm Version](https://img.shields.io/npm/v/awesome-mask.svg)


You can use patterns like:

```vue
<input type="text" v-mask="'99/99'" />
// Turns 1224 in 12/24
```

```vue
<input type="text" v-mask="'(99) 9999-9999'" />
// Turns 1149949944 in (11) 4994-9944
```

```vue
<input type="text" v-mask="'AAA-9999'" />
// Turns ABC1234 in ABC-1234
```

You can also format money:

```vue
<input type="text" v-mask="'money'" />
// Turns 123499 in 1.234,99
```

This directive can also receive a object from your `data` like:

```vue
<template>
  <p>
    <input v-mask="mask" type="text">
  </p>
</template>

<script>
 export default {
   data() {
     return {
       mask: '999.999.999-99'
     }
   }
 }
</script>
```

Sample using import:

```vue
<script>
import Component from './components/Component'
import AwesomeMask from 'awesome-mask'

export default {
  name: 'app',
  components: {
    Component
  },
  directives: {
    'mask': AwesomeMask
  }
}
</script>
```

[Examples](https://moip.github.io/awesome-examples/)
