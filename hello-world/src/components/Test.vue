<template>
    <div id="test">
        <h1>Test {{ name }} {{ age }}</h1>
        <p>{{ say('say this') }}</p>
    </div>
</template>


<script>
export default {
  name: 'Test',
  props: {
    name: String,
    age: Number
  },
  methods: {
    say: function(text) {
        return text;
    }
  }
}
</script>

<style>
    
</style>