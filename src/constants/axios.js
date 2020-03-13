import axios from "axios";

export default axios.create({
    baseURL: "ya.ru",
    //headers: {'X-Custom-Header': 'foobar'}
    //responseType: "json"
});
