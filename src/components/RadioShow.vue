<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Radio } from '../services/radio';

const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
    default: null
  }
});

const router = useRouter();
const route = useRoute();

const radioShow = ref(null);
const currentAudio = ref(null);
const isPlaying = ref(false);
const showListIds = ref(new Set());

const loadRadioShow = () => {
  const showId = props.id || route.params.id;
  if (!showId) return;
  radioShow.value = Radio.getRadioShowById(parseInt(showId));
};

onMounted(loadRadioShow);
watch(() => props.id, loadRadioShow);
watch(() => route.params, loadRadioShow);

const goBack = () => {
  router.push({ name: 'radioShows' });
};

const toggleSongList = (showId) => {
  if (showListIds.value.has(showId)) {
    showListIds.value.delete(showId);
  } else {
    showListIds.value.add(showId);
  }
};

const isSongListVisible = (showId) => {
  return showListIds.value.has(showId);
};

const playShow = (show) => {
  if (currentAudio.value && currentAudio.value.id === show.id && isPlaying.value) {
    currentAudio.value = null;
    isPlaying.value = false;
    return;
  }
  
  currentAudio.value = show;
  isPlaying.value = true;
  window.dispatchEvent(new CustomEvent('play-radio', {
    detail: {
      url: show.url_sound,
      title: `${radioShow.value.title} - ${show.title}`,
      author: radioShow.value.author,
      showId: show.id
    }
  }));
};

const getIvooxDownloadUrl = (show) => {
  if (!show.url_sound) return '#';
  const match = show.url_sound.match(/listen_mn_(\d+)/);
  if (!match) return '#';
  const title = encodeURIComponent(radioShow.value.title);
  return `https://www.ivoox.com/${title}${show.title}_md_${match[1]}_wp_1.mp3`;
};
</script>

<template>
  <div v-if="radioShow" class="radio-show">
    <div class="radio">
      <div class="return">
        <a class="link" @click.prevent="goBack">&lt;&lt; Volver</a>
      </div>
      <div class="radio-bot">
        <img :src="$image(`assets/images2/robots/${radioShow.featuredImage}`)" :alt="radioShow.title">
      </div>
    </div>
    <div class="radio-info">
      <div class="title"><h1>{{ radioShow.title }}</h1></div>
      <div class="author">By {{ radioShow.author }}</div>
      <div class="info">
        <p>{{ radioShow.description }}</p>
      </div>
      <div class="style">{{ radioShow.tags }}</div>
      
      <div 
        v-for="show in radioShow.shows" 
        :key="show.id" 
        class="show"
      >
        <div class="radio-link">
          <div
            class="flecha"
            :class="{ 'closed': isSongListVisible(show.id) }"
            :data-show-id="show.id"
            @click="toggleSongList(show.id)"
          >></div>
          <div class="date">{{ radioShow.title }} - {{ show.title }}</div>
          <div class="btn-play" style="text-align: right">
            <i 
              style="display: inline-block;cursor: pointer;"
              :data-show-id="show.id"
              :data-show-url="show.url_sound"
              :data-author="radioShow.author"
              :data-title="`${radioShow.title} - ${show.title}`"
              class="fas fa-play play-session"
              :class="{ 'fa-pause': currentAudio && currentAudio.id === show.id && isPlaying }"
              @click="playShow(show)"
            ></i>
          </div>
          <div class="" style="text-align: right;position: relative;">
            <a :href="getIvooxDownloadUrl(show)">
              <i style="display: inline-block;cursor: pointer;" class="fas fa-arrow-alt-circle-down"></i>
            </a>
          </div>
        </div>
        <div 
          :id="show.id" 
          class="song-list" 
          :data-show-list="show.id"
          :style="{ display: isSongListVisible(show.id) ? 'block' : 'none' }"
        >
          <ol>
            <li v-for="song in show.songs" :key="song.id">{{ song.title }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="radio-show">
    <p>Cargando...</p>
  </div>
</template>

<style scoped>
.show .song-list ol li {
  text-decoration: none;
}

.radio-link a,
.radio-link a:visited,
.radio-link a:active,
.radio-link a:focus,
.radio-link a:hover,
.radio-link a:link {
  color: #000;
  text-decoration: none;
}

.radio-show {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}

.radio-show .radio,
.radio-show .radio-info {
  align-self: flex-start;
  padding: 1em;
  flex: 0 1 300px;
}

.radio-show .radio-info {
  flex: 0 1 400px;
}

.radio-show .radio-info .author {
  margin: 1em 0;
  text-transform: uppercase;
  font-size: .8em;
}

.radio-show .radio-info .info {
  margin: 1em 0;
  letter-spacing: 1px;
}

.radio-show .radio-info .style {
  color: gray;
  font-style: italic;
  margin: 1em 0 2em 0;
}

.radio-show .return {
  margin-bottom: 1em;
}

.radio-show .radio-bot img {
  display: block;
  width: 100%;
  max-width: 300px;
}

.show {
  margin-bottom: 1.5em;
}

.show .radio-link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5em;
  border: 2px solid black;
  padding: 0 1em;
  width: fit-content;
  width: -moz-fit-content;
  margin-bottom: .5em;
  line-height: 1.2em;
}

.show .song-list {
  margin-bottom: 1.5em;
}

.show .song-list ol {
  margin: 0 1.2em;
}

.show .song-list ol li {
  padding: 0 0 0 .5em;
  margin: .4em 0.5em;
  text-decoration: none;
  width: -moz-max-content;
  font-size: .9em;
}

.flecha {
  cursor: pointer;
  transform: rotate(90deg);
  display: inline-block;
  font-size: 1.5em;
  margin: 0 .2em 0 0;
  &.closed {
    transform: rotate(-90deg);
  }
}

.btn-play {
  text-align: right;
  margin-left: 0.5em;
}

.play-session {
  display: inline-block;
  cursor: pointer;
}

.play-session.playing {
  color: #f00;
}

.download-icon {
  display: inline-block;
  cursor: pointer;
}

.link {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.fas {
  font-family: 'Font Awesome 6 Free' !important;
  font-weight: 900 !important;
  display: inline-block;
}
</style>
