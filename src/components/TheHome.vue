<template>
  <div class="radio-web">
    <div class="radio" style="position: relative;">
      <a class="link" href @click.prevent="$router.push('/radiovoluntas')"></a>
      <div class="img-radio">
        <img :src="radioImageMain" alt="" style="max-width: 100%;">
      </div>
      <div class="title">Radio Voluntas</div>
      <div class="text">
        Escucha todos nuestros programas de radio. Toneladas de música, puñados de estilos y quintales métricos
        de robots a tu entera disposición ¡sencillamente dale al PLAY!
      </div>
    </div>
    <div class="web" style="position: relative;">
      <a class="link" @click.prevent="$router.push('/revistas')"></a>
      <div class="img-web">
        <img :src="imageCover" :alt="lastMagazine?.title" style="max-width: 100%;">
      </div>
      <div class="title">Revista Voluntas {{ lastMagazine?.number_magazine }}</div>
      <div class="text">
        Lee u ojea todos los números que hemos publicado hasta la fecha, desde el primero hasta el chorrocientos
        y pico. Aquí tienes nuestra revista igual de gratis que en papel, pero peor.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import radioImageMain from '../assets/images/robots/International-Mierda-ok.gif'
import magazines from '../assets/magazines/magazines.json';
import { getMagazineCover } from '../utils/magazineCovers';

const lastMagazine = computed(() => {
  const activeMagazines = magazines.filter(({ active }) => active === 1);
  const sorted = [...activeMagazines].sort((a, b) => new Date(b.date_publish) - new Date(a.date_publish));
  return sorted[0] || null;
});

const lastMagazineCover = computed(() => lastMagazine.value?.cover || 'v50.jpg');
const imageCover = computed(() => getMagazineCover(lastMagazineCover.value));

</script>

<style scoped>
.text{
    max-width: 400px;
    margin: 1em auto;
    line-height: 1.3;
}
</style>
