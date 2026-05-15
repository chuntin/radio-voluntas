import { createApp }                      from 'vue'
import App                                from './App.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'
import TheHome                            from './components/TheHome.vue';
import TheMagazines                       from './components/TheMagazines.vue';
import TheRadioShowList                   from './components/TheRadioShowList.vue';
import RadioShowComponent                   from './components/RadioShow.vue';
import { Radio }                          from './services/radio';
import { resolveAssetImage }              from './utils/appImages';

const useImage = ((url) => {
  return resolveAssetImage(url);
});

const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const getRadioShowTitle = (id) => {
  const show = Radio.getRadioShowById(parseInt(id));
  return show ? show.title : '';
};

const getRadioShowIdFromParam = (slugAndId) => {
  if (!slugAndId) return null;

  const plainIdMatch = String(slugAndId).match(/^\d+$/);
  if (plainIdMatch) return plainIdMatch[0];

  const slugIdMatch = String(slugAndId).match(/-(\d+)$/);
  if (slugIdMatch) return slugIdMatch[1];

  return null;
};

const routes = [
  { name: 'home', path: '/', component: TheHome, meta: { title: 'Voluntas Radio' } },
  { name: 'magazines', path: '/revistas', component: TheMagazines, meta: { title: 'Revistas - Voluntas' } },
  {
    name: 'radioShows',
    path: '/radio',
    component: TheRadioShowList,
    meta: { title: 'Radio - Voluntas' }
  },
  {
    name: 'radioShow',
    path: '/radio/:slugAndId',
    component: RadioShowComponent,
    props: (route) => ({ id: getRadioShowIdFromParam(route.params.slugAndId) }),
    meta: { title: 'Programa - Voluntas' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title || 'Voluntas Radio';
  
  if (to.name === 'radioShow') {
    const radioShowId = getRadioShowIdFromParam(to.params.slugAndId);
    const showTitle = getRadioShowTitle(radioShowId);
    if (showTitle) {
      title = `${showTitle} - Voluntas Radio`;
    }
  }
  
  document.title = title;
  next();
});

const app = createApp(App)
app.config.globalProperties.$image = useImage;

app.use(router)

app.mount('#app')

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    }).catch((error) => {
      console.error('Error registrando el service worker', error);
    });
  });
}
