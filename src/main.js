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

const getRadioShowSlug = (id) => {
  const show = Radio.getRadioShowById(parseInt(id));
  return show ? slugify(show.title) : '';
};

const routes = [
  { name: 'home', path: '/', component: TheHome, meta: { title: 'Voluntas Radio' } },
  { name: 'magazines', path: '/revistas', component: TheMagazines, meta: { title: 'Revistas - Voluntas' } },
  { name: 'radioShows', path: '/radiovoluntas', component: TheRadioShowList, meta: { title: 'Radio - Voluntas' } },
  {
    name: 'radioShow',
    path: '/radiovoluntas/:id',
    component: RadioShowComponent,
    props: true,
    meta: { title: 'Programa - Voluntas' }
  },
  {
    name: 'radioShowSlug',
    path: '/radio/:slug-:id',
    component: RadioShowComponent,
    props: (route) => ({ id: route.params.id }),
    meta: { title: 'Programa - Voluntas' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title || 'Voluntas Radio';
  
  if ((to.name === 'radioShow' || to.name === 'radioShowSlug') && to.params.id) {
    const showTitle = getRadioShowTitle(to.params.id);
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
