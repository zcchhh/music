import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Search from "../views/first/Search.vue";
import PlayList from "../views/first/PlayList.vue";
import Recommend from "../views/first/Recommend.vue";
import Types from "../views/second/Types.vue";
import Collection from "../views/second/Collection.vue";
import Recoder from "../views/second/Recoder.vue";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Recommend',
    component: Recommend,
    meta: {
      isShowNav: true
    },
  },
  {
    path: '/hot',
    name: 'Hot',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/first/Hot.vue'),
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/playlist",
    name: "PlayList",
    component: PlayList,
  },
  {
    path: "/types",
    name: "types",
    redirect:'/types/collection',
    component:Types,
    children:[
      {
          path:"recoder",
          component:Recoder
      },
      {
          path:"collection",
          component:Collection
      },
  ],
  }
]

const router = new VueRouter({
  routes,
});

export default router;
