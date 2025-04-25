<script setup lang="ts">
//import { ref } from 'vue'

defineProps<{ msg: string }>()

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div>
      <button class="btn btn-primary" @click="downloadImage">Download Image</button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script lang="ts">
export default {
  methods: {
    downloadImage() {
      const base64Image = "data:image/png;base64,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";
      const fileName = "my-image.png";

      const link = document.createElement("a");
      link.href = base64Image;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>