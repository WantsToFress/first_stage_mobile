import axios from "axios";

export default axios.create({
    baseURL: "localhost/api",
    //headers: {'X-Custom-Header': 'foobar'}
    //responseType: "json"
});
