import Vue from 'vue'
import Router from 'vue-router'
import Story from './views/story/story'
import Theme from './views/theme'
import Recommend from './views/story/recommend/recommend'
import Newest from './views/story/newest/newest'
import Detail from './views/detail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/story',
      name: 'story',
      component: Story,
      children: [
        {
          path: 'recommend',
          component: Recommend
        }, {
          path: 'newest',
          component: Newest
        }, {
          path: '',
          redirect: '/story/recommend'
        }
      ]
    }, {
      path: '/theme',
      name: 'theme',
      component: Theme

    }, {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/story'
    }

  ]
})
