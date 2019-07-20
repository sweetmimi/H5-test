<template>
  <div class="radiostyle">
    <label for
           v-for="(val,index) in options"
           :key="index"
           @click="change(val.value)"
           :class="[ currentValue===val.value ? 'active':'']">
      {{val.text}}
      <input type="radio"
             style="display:none"
             v-model="currentValue"
             :value="val.value">
    </label>
  </div>
</template>
<script>
export default {
  name: "radio",
  props: {
    options: {
      type: Array,
      default: []
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: Boolean
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  created() { },
  methods: {
    change(val) {
      this.currentValue = val;
      this.$emit('input', val);
      this.$emit('on-change', val);
    }

  }
};
</script>
