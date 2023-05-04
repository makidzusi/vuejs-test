<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="ui-button"
    :class="{ [`ui-button_${type}`]: type }"
  >
    <slot />
  </button>
</template>

<script>
export default {

  name: 'UiButton',

  props: {
    type: String,
  },
};
</script>
