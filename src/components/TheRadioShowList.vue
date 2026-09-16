<template>
  <div class="radio list">
    <div class="list-item" v-for="radioShow in radioShows">
      <div class="list-item-image">
        <a class="link" href @click.prevent="goToRadioShow(radioShow)" rel='tab'>
          <img :src="$image(`assets/images/robots/${radioShow.featuredImage}`)" :alt="radioShow.title">
        </a>
      </div>
      <div class="list-content">

        <img v-if="radioShow.hasNewShow" class="new-program" :src="$image('assets/images2/nuevo-programa.png')">
        <a class="link" href @click.prevent="goToRadioShow(radioShow)" rel='tab'>
          <img :src="$image(`assets/images/robots/${radioShow.signImage}`)" :alt="radioShow.title" style="display: block;width: 100%;">
        </a>
        <div class="style">{{ radioShow.tags }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { Radio }      from '../services/radio';


const radioShows = Radio.getRadioShows();

const router = useRouter();

const goToRadioShow = (radioShow) => {
  const slug = radioShow.slug || radioShow.title.toLowerCase().replaceAll(' ', '-');
  router.push({
    name: 'radioShow',
    params: { slugAndId: `${slug}-${radioShow.id}` }
  });
};

</script>
