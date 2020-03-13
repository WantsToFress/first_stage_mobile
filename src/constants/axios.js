import axios from "axios";

export default axios.create({
    baseURL: "10.0.0.194/api",
    //headers: {'X-Custom-Header': 'foobar'}
    //responseType: "json"
});
