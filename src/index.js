// index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import odinImage from "./img/odin-lined.png";

console.log(greeting);


   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);