<template>
  <div>
    <div class="menu" :class="{active: menuState}">
      <ul>
        <li><router-link :to="{ name: 'magazines' }" class="link">Revistas</router-link></li>
        <li><router-link :to="{ name: 'radioShows' }" class="link">Radio</router-link></li>
      </ul>
    </div>
    <div class="container">
      <the-header :menu-open="menuState" @toggle-menu="toggleMenu" />
      <div id="content" class="content background">
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
      <div class="footer">
        <div class="social" v-if="!isPlaying">
          <div class="play-session pulse" @click="playRandom">
            <i class="fa fa-play"></i>
          </div>
        </div>
      </div>
    </div>
    <player-voluntas />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import TheHeader         from './components/TheHeader.vue';
import PlayerVoluntas     from './components/PlayerVoluntas.vue';
import { Radio }          from './services/radio';

const menuState = ref(false);
const isPlaying = ref(false);

function toggleMenu() {
  menuState.value = !menuState.value;
}

const playRandom = () => {
  const radioShows = Radio.getRadioShows();
  if (!radioShows.length) return;
  
  const randomIndex = Math.floor(Math.random() * radioShows.length);
  const randomShow = radioShows[randomIndex];
  
  if (!randomShow.shows?.length) return;
  
  const episode = randomShow.shows[0];
  
  window.dispatchEvent(new CustomEvent('play-radio', {
    detail: {
      url: episode.url_sound,
      title: `${randomShow.title} - ${episode.title}`,
      author: randomShow.author
    }
  }));
};

const handlePlayState = (event) => {
  isPlaying.value = event.detail;
};

onMounted(() => {
  window.addEventListener('play-state', handlePlayState);
});

onUnmounted(() => {
  window.removeEventListener('play-state', handlePlayState);
});

</script>
<style lang="scss">

*{
  padding: 0;
  margin:0;
  font-family: 'Josefin Sans', sans-serif;
  //letter-spacing: 1.5px;
}
html,body{
  height: 100%;
  width: 100%;
}
ul,ol{
  //list-style: none;
  margin: 0;
  padding:0;
}
h1{letter-spacing: 2px;}
.container{
  display: grid;
  grid-template-columns: 100%;
  //grid-template-rows: 10% 80% 10%;
  grid-gap: .5em;
  max-width: 100%;
  .header{
    height: 60px;
  }
}
.header{
  position: sticky;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  background: black;
  color: #fff;
  z-index: 9;
  top: 0;
  height: 60px;
  .header-rrss {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: stretch;
    list-style: none;
    a:hover svg {
      fill: #2c2c2c;
    }
    svg {
      display: block;
      width: 40px;
      height: 40px;
      fill: #FFF;
      transition: fill 0.2s ease-in-out;
    }
  }
  .menu-button{
    padding: 0 1em;
    height: 100%;
    display: flex;
  }
  .logo{
    padding: 0 1em;
    font-size: 2em;
    letter-spacing: 8px;
    font-weight: bold;
    a{
      text-decoration: none;
      color: #fff;
      :hover,:active,:link,:visited{
        text-decoration: none;
      }
    }
  }
  .logo-home{
    padding: 0 1em;
  }
}

.menu{
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  //height:60px;
  z-index: 9;
  top:0;
  left:0;
  background: lightgrey;
  color: #000;
  transition: ease-in .3s;
  .menu-button{
    margin-left: 1em;
    transition: ease-in .5s;
  }
  .logo-home{
    margin-right: 1em;
  }
  ul{
    position: fixed;
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    background: lightgray;
    transition: ease-in .3s;
    top:0;
    left:0;
    list-style: none;
    li{
      transition: ease-in .3s;
      .link{
        display: block;
        font-weight: bold;
        font-size: 1.2em;
        text-decoration: none;
        color:#000;
        :hover,:active,:link,:visited{
          text-decoration: none;
        }
      }

    }
  }
}
.menu.active ul{
  top:60px;
  transition: ease-in .3s;
  padding: 1em 0;
}

.menu-button.active{
  transition: ease-in .3s;
  .burguer-menu {
    &--dash {
      background: #fff;
      transition: ease-in .3s;
    }
  }
}


$spindefault: rotate(0deg);
$spinright: rotate(135deg);
$spinleft: rotate(-135deg);
$duration: .3s;
$type: ease-in-out;

// Mixin to position the menu bar
@mixin dash-burguer-menu () {
  @for $i from 1 through 3 {
    &--dash:nth-child(#{$i}) {
      top: #{$i*11}px;
      position: relative;
    }
  }
}

@mixin open-burguer-menu () {
  &--dash:nth-child(1) {
    top: 24px;
    transform: $spinright;
  }

  &--dash:nth-child(2) {
    left: -30px;
    opacity: 0;
  }

  &--dash:nth-child(3) {
    top: 20px;
    transform: $spinleft;
  }
}

.burguer-menu {
  width: 50px;
  height: 50px;
  margin: auto;
  cursor: pointer;
  transition: $duration * 2 $type;
  @include dash-burguer-menu();

  &--dash {
    height: 2px;
    width: 100%;
    display: block;
    background: #fff;
    transition: $duration $type;
    transform: $spindefault;
    opacity: 1;
    left: 0;
    transform: $spindefault;
    transition: $duration $type;

  }

  .open &{
    @include open-burguer-menu();
  }
}


//Content
.content{
  height:100%;
  margin: 50px auto;
  background-size: 50%;
  max-width: 1170px;
  //padding:100px;

  .radio-web{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    align-items: center;
    height: 100%;
    text-align: center;
    margin-bottom: 100px;
    .radio,.web{
      //position: relative;
      //background: #fff;
      //padding: 1em;
      //max-width: 275px;
      a{
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        height: 100%;
        left: 0;
      }
    }
    .img-radio,.img-web{
      max-width: 275px;
      margin: 0 auto 1em auto;
    }
    .title{
      font-size: 2.5em;
      font-weight: bold;
      letter-spacing: 10px;
      max-width: 400px;
      margin: 0 auto;
    }
  }
  .radio-show{
    //display: grid;
    //grid-template-columns: 300px 500px;
    //grid-column-gap: 15px;
    //grid-row-gap: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    flex-flow: wrap;
    img{
      display: block;
      width: 100%;
    }
    .radio,.radio-info{
      align-self: flex-start;
      padding:1em;
      flex: 0 1 300px;
    }
    .radio-info {
      flex: 0 1 400px;
      .author {
        margin: 1em 0;
        text-transform: uppercase;
        font-size: .8em;
      }
      .info {
        margin: 1em 0;
        letter-spacing: 1px;
      }
      .style {
        color: gray;
        font-style: italic;
        margin: 1em 0 2em 0;
      }
    }
    .radio {
      .return {
        a:link,a:visited,a:active,a:hover{
          color: #000;
          text-decoration: none;
        }
      }
    }
  }
}

//magazine
.magazine{
  max-width: 800px;
  margin: 0 auto;
  .article-title{
    font-size: 2em;
    //margin-bottom: 1em;
  }
  .article-image{
    margin:2em 0;
    img{
      width: 100%;
    }
  }
  .article-author{
    margin:1em 0;
    color: gray;
  }
  .article-content{
    line-height:1.5;
  }
}

//listado de programas de radio
.radio.list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  margin: 0;
  align-content: space-evenly;
  width:auto;
  .list-item{
    display: flex;
    a {
      text-decoration: none;
      color: initial;
    }

    //padding: 1em;
    align-content: center;
    .list-item-image {
      max-width: 150px;
      flex: 1 0 auto;
      padding: .5em;

      img{
        max-width: 100%;
        display: block;
      }
    }
    .list-content{
      position: relative;
      display: flex;
      flex-direction: column;
      padding: .5em;
      flex: 0 0 auto;
      width: 200px;
      .list-item-title{
        font-weight: bold;
        letter-spacing: 5px;
        font-size: 1.5em;
        word-wrap: break-word;
      }
      .list-item-author{
        text-transform: uppercase;
        margin: .5em 0 0 0;
      }
      .list-item-style{
        color: lightgray;
        margin: .5em 0 .5em 0;
      }
      .new-program {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 90px;
      }
    }
  }
}

//Magazines
.magazine.list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  //margin: 0;
  align-content: space-evenly;
  text-align: center;
  .list-item{
    display: flex;
    flex-direction: column;


    //padding: 1em;
    align-content: center;
    .list-item-image {
      max-width: 150px;
      padding: .5em;
      margin: 0 auto;
      position: relative;
      a{
        display: block;
        position: absolute;
        width: 100%;
        height:100%;
      }
      img{
        max-width: 100%;
        display: block;
        max-height: 180px;
      }
    }
    .list-content{
      display: flex;
      flex-direction: column;
      padding: .5em;
      flex: 0 0 auto;
      //width: 200px;
      .list-item-title{
        font-weight: bold;
        letter-spacing: 5px;
        font-size: 1.5em;
        //margin: 0 0 .5em 0;
        //position: relative;
        a,a:active,a:hover,a:focus{
          color: initial;
          text-decoration: none;
          text-underline: none;
        }
      }
      .list-item-number{
        //position: relative;
        a,a:active,a:hover,a:focus{
          color: initial;
          text-decoration: none;
          text-underline: none;
        }
      }
      .list-item-author{
        text-transform: uppercase;
        margin: .5em 0 0 0;
      }
      .list-item-date{
        font-style:italic;
        margin-top: .5em;
      }
      .list-item-style{
        color: lightgray;
        margin: .5em 0 .5em 0;
      }
    }
  }
}

@media screen and (min-width: 1170px) {
  .content {
    width: 1170px;
    padding: 0;
    background: 50%;
  }
  .magazine.list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
}
@media screen and (max-width: 1170px) {
  .content {
    width: initial;
    padding: 0;
  }
  .magazine.list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
  .radio.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 0;
    align-content: space-evenly;
    .list-content {
      width: 400px;
    }
  }
}
@media screen and (max-width: 800px) {
  .content{
    background-size: 60%;
  }
  .radio.list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 0;
    align-content: space-evenly;
  }

  .magazine.list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    .list-content {
      max-width: 300px;
      .new-program {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 90px;
      }
    }
  }
}
@media (max-width: 500px) {
  .content{
    background-size: 80%;

    .radio-web{
      grid-template-columns: repeat(1, 1fr);
    }
  }
  //.radio-show {
  //  display: grid;
  //  grid-template-columns: 100%;
  //  margin: 0 auto;
  //}
  .radio.list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 0;
    align-content: space-evenly;
    .list-item{
      //flex-wrap: wrap;
      .list-content {
        max-width: 400px;
        .new-program {
          position: absolute;
          top: 0;
          left: 0;
          max-width: 90px;
        }
      }
      .list-item-image {
        max-width: 100px;
      }

    }
  }
  .magazine.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
}

//footer
.footer{
  position: fixed;
  text-align: center;
  bottom: 0;
  background: #fff;
  //height: 60px;
  width: 100%;
}
.social:first-child {
  font-size: 3em;
}
.social{
    display: flex;
    justify-content: end;
    align-items: center;
    cursor: pointer;
  //
  //ul li{
  //  display: inline-block;
  //}
  //ul svg{
  //  //width: 60px;
  //  display: block;
  //  //opacity: .3;
  //  width: 60px;
  //  height: 60px;
  //  fill: #757575;
  //}
  //ul a:hover{
  //  svg{
  //    fill: #2c2c2c;
  //  }
  //}
}
.fa-play:before {
  content: "\f04b";
}
.pulse {
  position: relative;
  margin: 2em;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #000;
  font-size: 25px;
  color: white;
  animation: 1.6s playShadow ease-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
}
.pulse:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
  transition: 0.9s;
}
@keyframes playShadow {
  0% {
    box-shadow: 0 0 0 0px black, 0 0 0 0px black;
    transform: scale(1);
  }
  18% {
    box-shadow: 0 0 0 0px black, 0 0 0 0px fade(black, 20%);
  }
  35% {
    transform: scale(1.08);
  }
  76% {
    transform: scale(0.96);
  }
  100% {
    box-shadow: 0 0 0 8px transparent, 0 0 0 16px transparent;
    transform: scale(1);
  }
}
@media (max-width: 500px) {
  .header{
    .logo{
      padding: 0 1em;
      font-size: 1.1em;
      letter-spacing: 6px;
      font-weight: bold;
    }
  }
  .menu{
    height: 100%;
    top: 60px;
    left: -100vw;
    z-index: 99999;
  }
  .menu.active{
    left:0;

  }
  .menu ul{
    top:60px;
    left: -100vw;
    flex-direction: column;
    align-items: center;
    font-size: 2em;
    padding: 0;
    li{
      padding: .5em;
      margin: 0;
    }
  }
  .menu.active ul{
    left:0;
    padding: 0;
    top:60px;
  }

}


</style>
