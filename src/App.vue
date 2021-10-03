<template>
  <div>
    <json-editor></json-editor>
    <a class="m-4 text-sm text-gray-400" href="https://github.com/seanghay/jsonx" target="_blank">View on GitHub</a>
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
