<script setup lang="ts">
interface Props {
  user: User
  placeholder: string
}
const props = defineProps<Props>()
const emits = defineEmits(["onSubmit"])
const { twitterBorderColor } = useTailwindConfig()

const text = ref("")
const imageInput = ref()
const selectedFile = ref<File | null>(null)
let inputImageUrl = ref<string | null>(null)
const isDisable = computed(() => text.value === "")

function handleImageClick() {
  imageInput.value.click()
}

function handleImageChange(event: Event) {
  const inputElement = event.target! as HTMLInputElement

  const file = inputElement.files![0]
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (event) => {
    inputImageUrl.value = event!.target!.result! as string
  }
  reader.readAsDataURL(file)
}

function handleFormSubmit() {
  emits("onSubmit", {
    text: text.value,
    mediaFiles: [selectedFile.value],
  })
}

const data = {
  isDisable,
}
</script>

<template>
  <div>
    <div class="flex items-start flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-start">
        <img
          :src="props.user.profileImage"
          alt=""
          class="inline-block mt-2 w-10 h-10 rounded-full"
        />
      </div>
      <div class="w-full p-2">
        <textarea
          v-model="text"
          :placeholder="placeholder"
          :class="`${twitterBorderColor} focus:!border-blue-400 rounded-xl w-full min-h-[125px] p-2 text-lg resize-none outline-none text-gray-900 placeholder:text-gray-400 bg-transparent border dark:text-white focus:ring-0`"
        />
      </div>
    </div>
    <!-- fie selector -->
    <div :class="`${inputImageUrl ? 'block' : 'hidden'} p-4 pl-16`">
      <img
        :src="inputImageUrl"
        v-if="inputImageUrl"
        :class="`${twitterBorderColor} rounded-2xl border`"
      />
      <input
        type="file"
        ref="imageInput"
        accept="image/png, image/gif, image/jpeg"
        hidden
        @change="handleImageChange"
      />
    </div>

    <!-- icons -->
    <div class="flex p-2 pl-14 text-white justify-between">
      <div class="flex items-center ml-1">
        <div class="flex w-full">
          <div
            @click="handleImageClick"
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconImage />
          </div>
        </div>
        <div class="flex p-2 pl-4">
          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconGif />
          </div>
        </div>

        <div class="flex p-2 pl-4">
          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconChart />
          </div>
        </div>
        <div class="flex p-2 pl-4">
          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconEmoji />
          </div>
        </div>
        <div class="flex p-2 pl-4">
          <div
            class="p-2 text-blue-400 rounded-full cursor-pointer hover:bg-blue-50 dark:hover:bg-dim-800"
          >
            <IconCalendar />
          </div>
        </div>
      </div>

      <div class="mr-4">
        <UIButton
          size="lg"
          :disable="(data.isDisable as any)"
          @click="handleFormSubmit"
        >
          Tweet
        </UIButton>
      </div>
    </div>
  </div>
</template>
