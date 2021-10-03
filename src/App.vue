<template>
  <div>
    <json-editor></json-editor>
  </div>
</template>
<script>
import JSONEditor from "./components/JSONEditor.vue";

export default {
  components: {
    "json-editor": JSONEditor,
  },
};
</script>
