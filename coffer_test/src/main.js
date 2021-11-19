import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button } from 'vant'
import { NavBar } from 'vant'
import { Form } from 'vant';
import { Field } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Popup } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { TreeSelect } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Search } from 'vant';
import { Card } from 'vant';
import { Tag } from 'vant';
import { Toast } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Icon } from 'vant';
import { Stepper } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Tab, Tabs } from 'vant';
import { Empty } from 'vant';
import { Divider } from 'vant';
import { SwipeCell } from 'vant';
import { PullRefresh } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant'
import { Dialog } from 'vant';
import { ActionSheet } from 'vant';
import { AddressEdit } from 'vant';
import { Area } from 'vant';
import { AddressList } from 'vant';
import { Image as VanImage } from 'vant';
import { Uploader } from 'vant';

Vue.use(Uploader)
Vue.use(VanImage);
Vue.use(AddressList);
Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(ActionSheet);
// 全局注册
Vue.use(Dialog);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(PullRefresh);
Vue.use(SwipeCell);
Vue.use(Divider);
Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Stepper);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Toast);
Vue.use(Tag);
Vue.use(Card);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(TreeSelect);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Button);
// import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'
// axios.defaults.baseURL = 'http://localhost:8080'
//全局配置请求时携带cookie
axios.defaults.withCredentials = true
//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
//原型中项目接口
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
