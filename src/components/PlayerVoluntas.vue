<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

const isPlaying = ref(false);
const isMuted = ref(false);
const isVisible = ref(false);
const currentTitle = ref('');
const currentAuthor = ref('');
const currentTime = ref(0);
const duration = ref(0);
const buffered = ref(0);
const volume = ref(0.7);
const restoreVolume = ref(0.7);
const audioRef = ref(null);

watch(isPlaying, (newVal) => {
  window.dispatchEvent(new CustomEvent('play-state', { detail: newVal }));
});

watch(isVisible, (newVal) => {
  if (!newVal) {
    isPlaying.value = false;
    window.dispatchEvent(new CustomEvent('play-state', { detail: false }));
  }
});

const handlePlayRadio = async (event) => {
  const { url, title, author } = event.detail;
  currentTitle.value = title;
  currentAuthor.value = author;
  isVisible.value = true;
  
  await nextTick();
  
  if (audioRef.value) {
    audioRef.value.src = url;
    audioRef.value.load();
    audioRef.value.volume = volume.value;
    audioRef.value.play().then(() => {
      isPlaying.value = true;
    }).catch(err => {
      console.log('Playback error:', err);
    });
  }
};

const togglePlay = () => {
  if (!audioRef.value) return;
  
  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play();
    isPlaying.value = true;
  }
};

const toggleMute = () => {
  if (!audioRef.value) return;

  const newMuted = !isMuted.value;
  if (newMuted) {
    volume.value = 0;
    audioRef.value.volume = 0;
  } else {
    volume.value = 0.7;
    audioRef.value.volume = 0.7;
  }
  audioRef.value.muted = newMuted;
  isMuted.value = newMuted;
};

const seekVolume = (event) => {
  if (!audioRef.value) return;
  
  const rail = event.currentTarget;
  const rect = rail.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const newVolume = Math.max(0, Math.min(1, percent));
  audioRef.value.volume = newVolume;
  volume.value = newVolume;
  if (newVolume > 0 && audioRef.value.muted) {
    audioRef.value.muted = false;
    isMuted.value = false;
  }
};

const updateVolumeFromSystem = () => {
  if (!audioRef.value) return;
  volume.value = audioRef.value.volume;
  if (audioRef.value.muted && audioRef.value.volume > 0) {
    isMuted.value = false;
  }
};

const seekTo = (event) => {
  if (!audioRef.value || !duration.value) return;
  
  const rail = event.currentTarget;
  const rect = rail.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  audioRef.value.currentTime = percent * duration.value;
};

const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime;
    duration.value = audioRef.value.duration || 0;
  }
};

const onProgress = () => {
  if (audioRef.value && audioRef.value.buffered.length > 0) {
    buffered.value = audioRef.value.buffered.end(audioRef.value.buffered.length - 1);
  }
};

const onLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration;
  }
};

const onPause = () => {
  isPlaying.value = false;
};

const onPlay = () => {
  isPlaying.value = true;
};

const onEnded = () => {
  isPlaying.value = false;
};

const formatTime = (seconds) => {
  const totalSeconds = Math.floor(Number(seconds));
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '00:00';

  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return [hours, mins, secs].map((value) => value.toString().padStart(2, '0')).join(':');
  }

  return [mins, secs].map((value) => value.toString().padStart(2, '0')).join(':');
};

const getProgressPercent = () => {
  if (!duration.value) return 0;
  return (currentTime.value / duration.value) * 100;
};

const getBufferedPercent = () => {
  if (!duration.value) return 0;
  return (buffered.value / duration.value) * 100;
};

onMounted(() => {
  window.addEventListener('play-radio', handlePlayRadio);
});

onUnmounted(() => {
  window.removeEventListener('play-radio', handlePlayRadio);
});
</script>

<template>
  <div v-if="isVisible" class="player-voluntas">
    <div class="player-content">
      <div class="voluntas__time-rail" @click="seekTo">
        <div class="voluntas__time-total"></div>
        <div class="voluntas__time-buffering" :style="{ width: getBufferedPercent() + '%' }"></div>
        <div class="voluntas__time-current" :style="{ width: getProgressPercent() + '%' }"></div>
        <div class="voluntas__time-handle" :style="{ left: getProgressPercent() + '%' }"></div>
      </div>
      <div class="voluntas__timer">
        <div class="voluntas__timer__time">
          <span class="voluntas__timer__time__current">{{ formatTime(currentTime) }}</span>
        </div>
        <div class="voluntas__timer__time">
          <span class="voluntas__timer__time__duration">{{ formatTime(duration) }}</span>
        </div>
      </div>
      <div class="voluntas__info">
        <div class="track-details">
          <div class="track-title"><a href="#">{{ currentTitle }}</a></div>
          <div class="track-author">{{ currentAuthor }}</div>
        </div>
        <div class="voluntas__controls">
          <div class="voluntas__button voluntas__play" :class="{ playing: isPlaying }">
            <button @click="togglePlay" type="button" aria-label="Play/Pause">
              <i class="fas" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
            </button>
          </div>

          <div class="voluntas__button voluntas__mute" :class="{muted: isMuted}">
            <button @click="toggleMute" type="button" aria-label="Mute/Unmute">
              <i class="fas" :class="isMuted ? 'fa-volume-mute' : 'fa-volume-up'"></i>
            </button>
          </div>
          
          <div class="voluntas__volume-rail" @click="seekVolume">
            <div class="voluntas__volume-total"></div>
            <div class="voluntas__volume-current" :style="{ width: ((isMuted ? 0 : volume) * 100) + '%' }"></div>
          </div>
        </div>
      </div>

    </div>
    
    <audio 
      id="player-audio-widget"
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @progress="onProgress"
      @loadedmetadata="onLoadedMetadata"
      @pause="onPause"
      @play="onPlay"
      @ended="onEnded"
      @volumechange="updateVolumeFromSystem"
    ></audio>
  </div>
</template>

<style lang="scss">
.player-voluntas {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: black;
  z-index: 999999999999999999;
}

.player-content {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
}


.voluntas__timer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
}
.voluntas__timer__time {
  color: #FFF;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  //padding: 0 5px;
  //width: 60px;
}

.voluntas__time-display {
  display: table;
  table-layout: fixed;
  width: 100%;
}

.voluntas__time-rail {
  direction: ltr;
  //flex-grow: 1;
  height: 18px;
  //margin: 0 10px;
  //padding-top: 10px;
  position: relative;
  cursor: pointer;
}

.voluntas__time-total,
.voluntas__time-buffering,
.voluntas__time-loaded,
.voluntas__timer__time__current,
.voluntas__time-hovered,
.voluntas__time-float,
.voluntas__time-float-current,
.voluntas__time-float-corner,
.voluntas__time-marker {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  cursor: pointer;
  display: block;
  height: 10px;
  position: absolute;
}

.voluntas__time-total {
  background: rgba(255, 255, 255, 0.3);
  width: 100%;
  //&:hover {
  //  background: rgba(255, 255, 255, 0.5);
  //}
}

.voluntas__time-buffering {
  background: rgba(255, 255, 255, 0.3);
  //top: 5px;
}

.voluntas__time-loaded {
  //background: rgba(255, 255, 255, 0.3);
}

.voluntas__time-current,
.voluntas__time-handle-content {
  background: transparent;
  font-size: 1.2rem;
}

.voluntas__time-hovered {
  background: rgba(255, 255, 255, 0.5);
}

.voluntas__timer__time__current {
  background: transparent;
  //top: 5px;
}

.voluntas__time-handle {
  border-radius: 50%;
  cursor: pointer;
  height: 12px;
  margin-left: -6px;
  position: absolute;
  top: -1px;
  width: 12px;
  background: #fff;
  box-shadow: 0 0 0.01em rgba(255, 255, 255, 0.7);
}

.voluntas__info {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //height: 100%;
  padding: 0 10px;

}
.voluntas__controls {
  position: absolute;
  top: 20px;
  right: 50%;
  left: 50%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  height: 50px;
}

.voluntas__button > button {
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.voluntas__play > button {
  border: 2px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.voluntas__play > button i {
  color: #fff;
  font-size: 1.5rem;
}

.voluntas__mute > button {
  width: 50px;
  height: 50px;
}

.voluntas__mute > button i {
  color: #fff;
  font-size: 1rem;
}

.voluntas__volume-rail {
  flex: 0 0 80px;
  height: 10px;
  position: relative;
  cursor: pointer;
  margin-left: 8px;
  margin-right: 10px;
}

.voluntas__volume-total,
.voluntas__volume-current {
  border-radius: 2px;
  height: 6px;
  position: absolute;
  top: 2px;
  left: 0;
}

.voluntas__volume-total {
  background: rgba(255, 255, 255, 0.3);
  width: 100%;
}

.voluntas__volume-current {
  background: #fff;
  width: 100%;
}

.track-details {
  //padding: 0 10px;
  flex: 1;
}

.track-details .track-title {
  font-size: 1rem;
  font-weight: bold;
}

.track-details .track-title a {
  color: #fff;
  text-decoration: none;
}

.track-details .track-author {
  color: #ccc;
  font-size: 0.9rem;
}

@media (max-width: 768px) {


  .track-details {
    bottom: 10px;
  left: 10px;
    right: 10px;
  }

.track-details .track-title {
    font-size: 0.9rem;
  }
}
</style>
