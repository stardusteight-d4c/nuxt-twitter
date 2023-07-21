<script setup lang="ts">
interface IProps {
  modelValue: string
  type?: string
  placeholder?: string
  label?: string
}
const { modelValue, type = 'text', placeholder = '', label = '' } = defineProps<IProps>();
  const emits = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  emits('update:modelValue', newValue);
};
</script>

<template>
  <div>
    <label
      :for="label"
      v-if="label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <input
      :id="label"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      class="block px-4 w-full border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</template>
