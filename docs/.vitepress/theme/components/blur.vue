<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  const image = document.querySelector('.VPImage.image-src');
  image.classList.add('blur');
  setTimeout(() => {
    image.classList.remove('blur');
  }, 500)
});
</script>

<style>
.VPImage.image-src {
  &.blur {
    filter: blur(20px);
    /* transform: translate(-50%, -50%) scale(0.88); */
  }
}
</style>