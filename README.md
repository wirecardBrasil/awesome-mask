The awesome-mask runs with `Vue.js` and uses the `vanilla-masker` to make your form awesome with masks.

You can use patterns like:

```
<input type="text" v-mask="'99/99' />
// Turns 1224 in 12/24
```

```
<input type="text" v-mask="'(99) 9999-9999' />
// Turns 1149949944 in (11) 4994-9944
```



```
<input type="text" v-mask="'AAA-9999' />
// Turns ABC1234 in ABC-1234
```


This directive can also receive a object from your `data` like:

```
<template>
 <p><input v-mask="mask" type="text" ></p>
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

You can also change the mask on the fly:

```
<template>
 <p><input v-mask="mask" type="text" @input="updateMask"></p>
</template>
<script>
export default {
  data() {
    return {
      mask: '999.999.999-99'
    }
  },
  methods: {
    updateMask (val) {
      if(val.lenght > 14 ){
        this.mask = '99.999.999/9999-99'
      }
    }
  }
}
</script>
```
