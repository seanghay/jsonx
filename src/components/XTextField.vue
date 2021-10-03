<template>
  <input
   
   @input="$emit('input', $event.target.value)"
   :value="value"
    placeholder="Transform (JSONPath)"
   class="monospaced rounded bg-dark-700 text-white px-4" type="text" name="name">
</template>

<script>
export default {
  props: {
    value: String,
    default: ''
  }
}
</script>