import text from "./text"
import image from "./image"
const elements ={
    text,
    image
}



export default {
    factory(type,defaultOptions){
        return elements[type];
    }
}