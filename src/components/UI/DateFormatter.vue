<template>
  <span>
    <slot name="date" v-bind:date="formattedDate">
    </slot>
  </span>
</template>

<script>
import { DateTime } from 'luxon';
// можно было бы форматирование также вынести в функцию, чтобы использовать в коде
// или шаблоне через {{format(date)}} ,
// но если хотим например какую то универсальную стилизованную колонку для
// таблицы предпочел бы ее вынести в такой HOC скорее всего

export default {
  name: 'DateForamtter',
  props: {
    date: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: 'dd.MM.yyyy',
    },
  },
  computed: {
    formattedDate() {
      const date = DateTime.fromJSDate(new Date(this.$props.date)).toFormat(this.$props.format);
      if (date === 'Invalid DateTime') {
        return 'Ошибка парсинга даты...';
      }
      return date;
    },
  },
};
</script>
