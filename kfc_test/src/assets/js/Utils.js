class Utils {
    querystring(o) {
        let params = "";
        for (let key in o) {
            params += `${key}=${o[key]}&`
        }
        return params.slice(0, -1)
    }
}
export const utils = new Utils();