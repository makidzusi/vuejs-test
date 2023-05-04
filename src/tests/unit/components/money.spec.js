import { mount } from '@vue/test-utils';
import Money from '@/components/UI/Money.vue';

const testCases = [
  ['asd', '', undefined],
  ['am100', '100', 100],
  [',1105', '1 105', 1105],
  ['20asd000', '20 000', 20000],
  ['1000.', '1 000.', 1000],
  ['1000,', '1 000.', 1000],
  ['1000.5', '1 000.5', 1000.5],
  ['1000.50', '1 000.50', 1000.5],
  ['1000.56', '1 000.56', 1000.56],
  ['1000.56.', '1 000.56', 1000.56],
  ['1000.567', '1 000.56', 1000.56],
];

describe('Money component', () => {
  test.each(testCases)('%p (%p) -> %p', async (input, value, emitted) => {
    const wrapper = mount(Money);
    const control = wrapper.find('input');

    control.setValue(input);

    await wrapper.vm.$nextTick();
    expect(control.element.value).toBe(value);
    expect(wrapper.emitted('input')[1]).toEqual(emitted === undefined ? undefined : [emitted]);
  });
});
