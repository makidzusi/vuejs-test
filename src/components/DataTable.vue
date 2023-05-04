<template>
  <div class="ui-table">
    <div class="ui-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>
    <div class="ui-table__body" :style="templateColumnsStyle">
      <div class="ui-table__row ui-table__head">
        <div v-for="column in columns" :key="column.prop" class="ui-table__cell">
          {{ column.label }}
        </div>
      </div>
      <div v-for="row in paginatedRows" :key="`row-${row.id}`" class="ui-table__row">
        <div v-for="column in columns" :key="`${column.prop}-${row.id}`" class="ui-table__cell">
          <span class="ui-table__cell-label">
            {{ column.label }}
          </span>
          <slot v-if="isSlottedColumn(column.prop)" :name="generateSlotName(column.prop)" v-bind:value="row[column.prop]"></slot>
          <span v-else>
            {{ row[column.prop] }}
          </span>
        </div>
      </div>
    </div>

    <div class="ui-table__paginator">
      <ui-pagination v-model="page" :pages="pageCount" />
    </div>
  </div>
</template>

<script>
// для форматирования я использовал слоты, но также если мы делаем какую-то очень узко специалзированную таблицу
// наверное можно было бы и напрямую сделать какой нибудь проп typeColumn и enum доступных типов
export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 4,
    },
    filters: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    page: 1,
    moneyFilter: 'asd12312',
  }),

  methods: {
    generateSlotName(label) {
      return `col-${label}`;
    },
  },
  watch: {
    moneyFilter() {
      this.page = 1;
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filteredRows.length / this.pageSize);
    },
    filteredRows() {
      // хорошо бы, вынести фильтрацию на бэк, у меня так был печальный опыт с проектом
      // бэкэнд отдавал +- 5 тысяч больших записей и приходилось их в indexedDb сохранять и фильтровать
      // чтобы лишний раз на бэк не ходить и не зависать, но это поможет только если услово "холодные" данные
      if (Number.isNaN(Number(this.moneyFilter))) {
        return this.$props.rows;
      }
      return this.$props.rows.filter((el) => el.money <= this.moneyFilter);
    },
    paginatedRows() {
      const start = (this.page - 1) * this.$props.pageSize;
      return this.filteredRows.slice(start, start + this.$props.pageSize);
    },
    isSlottedColumn() {
      return (label) => {
        return !!this.$scopedSlots[this.generateSlotName(label)];
      };
    },
    templateColumnsStyle() {
      const value = this.$props.columns.reduce((prev, next) => `${prev} ${next.width}`, '').trim();
      return {
        gridTemplateColumns: value,
      };
    },
  },
};
</script>
