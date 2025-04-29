<template>
  <button class="btn btn-primary gap-2" @click="handleButtonClick">
    <img src="../assets/qrcode-white.svg" width="40">
  </button>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id as string;

const fetchedImageLink = ref<string | null>(null);

function downloadImage(base64Image: string) {
  const fileName = "qrCode.png";
  const link = document.createElement("a");
  link.href = base64Image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function fetchImageLink() {
  try {
    const response = await axios.get(`/api/item/getQrCode/${id}`);
    fetchedImageLink.value = response.data.qrCode;
    if (fetchedImageLink.value) {
      downloadImage(fetchedImageLink.value);
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

function handleButtonClick() {
  if (!fetchedImageLink.value) {
    fetchImageLink();
  } else {
    downloadImage(fetchedImageLink.value);
  }
}
</script>
