The awesome-mask runs with `Vue.js` and uses the `vanilla-masker` to make your form awesome with masks.

[Examples](https://moip.github.io/awesome-examples/)

You can use patterns like:

```vue
<input type="text" v-mask="'99/99' />
// Turns 1224 in 12/24
```

```vue
<input type="text" v-mask="'(99) 9999-9999' />
// Turns 1149949944 in (11) 4994-9944
```



```vue
<input type="text" v-mask="'AAA-9999' />
// Turns ABC1234 in ABC-1234
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
```
DISCLAIMER: If you use Windows, please use the version `0.3.3`, there was a problem with Vanilla-Masker to build at Windows.
