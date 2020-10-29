<template>
  <div ref="toastuiEditor" />
</template>
<script>
import Editor from '@toast-ui/editor'
import { optionsMixin } from './options'

export default {
  name: 'ToastuiEditor',
  mixins: [optionsMixin],
  props: {
    // eslint-disable-next-line
    previewStyle: {
      type: String
    },
    // eslint-disable-next-line
    height: {
      type: String
    },
    // eslint-disable-next-line
    initialEditType: {
      type: String
    },
    // eslint-disable-next-line
    initialValue: {
      type: String
    },
    // eslint-disable-next-line
    options: {
      type: Object
    }
  },
  watch: {
    previewStyle(newValue) {
      this.editor.changePreviewStyle(newValue)
    },
    height(newValue) {
      this.editor.height(newValue)
    }
  },
  mounted() {
    const options = {
      ...this.computedOptions,
      el: this.$refs.toastuiEditor
    }
    this.editor = new Editor(options)
  },
  methods: {
    getRootElement() {
      return this.$refs.toastuiEditor
    }
  }
}
</script>
