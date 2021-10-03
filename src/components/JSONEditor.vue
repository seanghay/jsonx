<template>
  <div>
    <div class="flex gap-2 m-4 flex-wrap">
      <x-button @click="prettify()">Prettify</x-button>
      <x-button @click="minify()">Minify</x-button>
      <x-text-field
        v-model="jsonPathValue"
        @input="jsonPathChange()"
        class="flex-1"
      ></x-text-field>
    </div>
    <div class="flex flex-col gap-4 m-4">
      <codemirror
        class="flex-1"
        @input="onCodeChange()"
        v-model="code"
        :options="cmOptions"
      />

      <codemirror class="flex-1" v-model="codeOutput" :options="cmOptions" />
    </div>
  </div>
</template>
<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
import "codemirror/addon/edit/closebrackets";

import { codemirror } from "vue-codemirror";
import XButton from "./XButton.vue";
import XTextField from "./XTextField.vue";
import JSON5 from "json5";
import jp from "jsonpath";

export default {
  components: { codemirror, XButton, XTextField },
  data() {
    return {
      jsonPathValue: "",
      code: "",
      codeOutput: "",
      dataOutput: null,
      cmOptions: {
        tabSize: 2,
        indentSize: 2,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        autoCloseBrackets: true,
      },
    };
  },
  methods: {
    onCodeChange() {
      try {
        this.dataOutput = JSON5.parse(this.code);
        this.invalidateJSON();
      } catch (e) {
        this.dataOutput = [];
      }
    },
    prettify() {
      const value = JSON5.parse(this.code);
      this.code = JSON5.stringify(value, null, 2);
    },
    minify() {
      const value = JSON5.parse(this.code);
      this.code = JSON5.stringify(value);
    },
    jsonPathChange() {
      this.invalidateJSON();
    },
    invalidateJSON() {
      try {
        if (this.jsonPathValue.startsWith("_")) {
          setTimeout(() => {
            try {
              const initializer = (interpreter, globalObject) => {
                interpreter.setProperty(
                  globalObject,
                  "_",
                  interpreter.nativeToPseudo(this.dataOutput)
                );
              };

              const transpiled = Babel.transform(this.jsonPathValue, {
                presets: ["env"],
              }).code;
              const interpreter = new Interpreter(transpiled, initializer);
              interpreter.run();
              const native = interpreter.pseudoToNative(interpreter.value);
              this.codeOutput = JSON.stringify(native, null, 2);
            } catch (ignored) {              
            }
          });
          return;
        }

        const data = jp.query(this.dataOutput, this.jsonPathValue);
        this.codeOutput = JSON.stringify(data, null, 2);
      } catch (e) {
        this.codeOutput = JSON.stringify(this.dataOutput, null, 2);
      }
    },
  },
};
</script>
