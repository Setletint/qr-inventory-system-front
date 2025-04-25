<script setup lang="ts">
const props = defineProps<{ imageLink: string }>()

function downloadImage(base64Image: string) {
  const fileName = "my-image.png";

  const link = document.createElement("a");
  link.href = base64Image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

</script>

<template>
  <button
    class="btn btn-primary gap-2"
    @click="downloadImage(props.imageLink)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
    </svg>
    Download QR Code
  </button>
</template>
