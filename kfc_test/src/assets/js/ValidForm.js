import Vue from 'vue';
import { Notify } from 'vant';

// 全局注册
Vue.use(Notify);

class ValidForm {
    valid(o) {
        for (let key in o) {
            if (!o[key].reg.test(o[key].value)) {
                //提示
                Notify({
                    type: "warning",
                    message: o[key].erroMsg
                })
                return false
            }
        }
        return true
    }
}
export const validForm = new ValidForm();