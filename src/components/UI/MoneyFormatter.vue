<script>
// можно было бы форматирование также вынести в функцию, чтобы использовать в коде
// или шаблоне через {{format(value)}} ,
// но если хотим например какую то универсальную стилизованную колонку для
// таблицы предпочел бы ее вынести в такой HOC скорее всего

export default {
  name: 'DateForamtter',
  props: {
    value: {
      type: Number,
      required: true,
    },
    locale: {
      type: String,
      default: 'ru-RU',
    },
  },
  render() {
    return this.$scopedSlots.default({
      value: this.formattedValue,
    });
  },
  computed: {
    formattedValue() {
      return new Intl.NumberFormat(this.$props.locale).format(this.$props.value);
    },
  },
};
</script>
