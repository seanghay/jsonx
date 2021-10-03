<template>
  <button
      class="
        text-white
        transition
        font-bold
        py-2
        px-4
        rounded
        bg-green-600
        hover:bg-green-700
      "
      @click="$emit('click')"
    >
      <slot></slot>
    </button> 
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'green'
    },
  }
}
</script>