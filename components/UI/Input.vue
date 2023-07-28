<script setup lang="ts">
interface IProps {
  modelValue: string
  type?: string
  placeholder?: string
  label?: string
}

const {twitterBorderColor} = useTailwindConfig()
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
      class="block text-base font-semibold text-white/80 mb-1"
      >{{ label }}</label
    >
    <input
      :id="label"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      :class="`${twitterBorderColor} border bg-transparent block px-4 py-2 outline-none w-full rounded-full shadow-sm focus:!border-blue-500 sm:text-sm`"
    />
  </div>
</template>
