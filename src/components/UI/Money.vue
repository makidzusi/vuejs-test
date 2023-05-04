<template>
  <input class="ui-money" ref="input" @keydown="handleKeyDown" type="text" v-model="rawInput" @keypress="handleKeyPress" @input="handleInput" />
</template>

<script>
export default {
  name: 'UiMoney',

  props: {
    value: {
      type: [Number, String],
      require: true,
    },
  },

  data() {
    return {
      rawInput: '',
      numberValue: undefined,
      cursorPosition: 0,
    };
  },
  watch: {
    value: {
      handler() {
        this.rawInput = String(this.value);
        this.handleInput();
      },
      immediate: true,
    },
    numberValue: {
      handler() {
        this.$emit('input', this.numberValue);
      },
      immediate: true,
    },
  },
  methods: {
    clearString(_string) {
      // у вас была проблема ? Вы решили ее регуляркой, теперь у вас две проблемы
      const regex = new RegExp(/[^\d|.|,]+/g);
      return _string.replace(regex, '').replaceAll(',', '.');
    },
    stringHasFractionPart(string) {
      return string.includes('.');
    },
    formatNumber(_number) {
      // ох уж этот пробел, аж думал что jest с ума сошел
      return new Intl.NumberFormat('ru-RU').format(_number).replace(',', '.').replace('\xa0', ' ');
    },
    handleKeyDown(e) {
      this.cursorPosition = e.target.selectionStart;
    },
    handleInput() {
      const parsedString = this.clearString(this.rawInput);
      if (!this.clearString(this.rawInput).length) {
        this.numberValue = undefined;
        this.rawInput = '';
        return;
      }

      let [intPart, tail] = parsedString.split('.');

      if (intPart === '') {
        intPart = tail;
        tail = undefined;
      }

      if (tail?.length >= 3) {
        tail = tail.slice(0, 2);
      }
      console.log(intPart, tail);
      this.numberValue = Number([intPart, tail].join('.'));

      if (Number.isNaN(this.numberValue)) {
        this.numberValue = undefined;
      }

      intPart = this.formatNumber(intPart);

      this.rawInput = tail === undefined ? intPart : `${intPart}.${tail}`;
      // this.$nextTick(() => {
      //   this.$refs.input.setSelectionRange(this.cursorPosition + 1, this.cursorPosition + 1);
      // });
    },
    isAllowedLetter(letter) {
      const regex = new RegExp(/\d|,|\./gm);
      return letter.match(regex);
    },
    handleKeyPress(event) {
      if (!this.isAllowedLetter(event.key)
      || (this.stringHasFractionPart(event.target.value) && event.key === '.')
      || (this.stringHasFractionPart(event.target.value) && event.key === ',')) {
        event.preventDefault();
      }
    },
  },
};
</script>
