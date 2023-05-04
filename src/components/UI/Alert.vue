<template>
  <div class="ui-alert" :class="{ [`ui-alert_${type}`]: type }">
    <h4 class="ui-alert__header">
      {{ header }}
    </h4>
    <slot />
    <template v-if="$scopedSlots.footer">
      <hr />
      <slot name="footer" />
    </template>
  </div>
</template>

<script>
export default {

  name: 'UiAlert',

  props: {
    type: String,
    header: String,
  },
};
</script>
