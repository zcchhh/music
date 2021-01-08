import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//定义全局时间过滤函数
Vue.filter('changSeconds', (v) => {
  var seconds = parseInt(v);
  var newTime = "00:00";
  if (seconds < 10) {
    newTime = `00:0${seconds}`
  } else if (seconds >= 10 && seconds <= 60) {
    newTime = `00:${seconds}`
  } else if (seconds > 60 && seconds < 600) {
    let newSeconds = "00";
    if ((seconds % 60) < 10) {
      newSeconds = `0${seconds % 60}`;
    } else {
      newSeconds = seconds % 60;
    }
    newTime = `0${Math.floor(seconds / 60)}:${newSeconds}`
  }
  return newTime;
})
new Vue({
  router,
  render: h => h(App), 
  data:function(){
    return{
      isShowLoading:false,
    };
  },
}).$mount('#app');
