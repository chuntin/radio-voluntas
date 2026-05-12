<template>
  <div class="radio list">
    <div class="list-item" v-for="radioShow in radioShows">
      <div class="list-item-image">
        <a class="link" href @click.prevent="goToRadioShow(radioShow)" rel='tab'>
          <img :src="$image(`assets/images/robots/${radioShow.featuredImage}`)" :alt="radioShow.title">
        </a>
      </div>
      <div class="list-content">

        <img v-if="hasNewShow(radioShow)" class="new-program" :src="$image('assets/images2/nuevo-programa.png')">
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

const DAYS_TO_CONSIDER_NEW_SHOW = 7;
const radioShows = Radio.getRadioShows();

const router = useRouter();

const hasNewShow = ({ createdAt }) => {
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const timeMsDifference = now - createdAtDate;
  const timeDaysDifference = timeMsDifference / (1000 * 60 * 60 * 24);
  return timeDaysDifference < DAYS_TO_CONSIDER_NEW_SHOW;
};

const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const goToRadioShow = (radioShow) => {
  const slug = slugify(radioShow.title);
  router.push({
    name: 'radioShowSlug',
    params: { slug, id: radioShow.id }
  });
};

</script>
