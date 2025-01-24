'use strict';

import { F } from "./Functions";
import leaflet from '../leaflet/leaflet.js'
import '../leaflet/leaflet.css'

// maps: https://leafletjs.com/
class leafletMap {
  constructor(longitude = 13.7534, latitude = 100.505, zoomLevel = 10) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.zoomLevel = zoomLevel;
    this.createMap();
    return this;
  }
  createMap = () => {
    this.map = L.map('map').setView([this.longitude, this.latitude], this.zoomLevel,);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      zIndex: 1,
    }).addTo(this.map);
    this.map.getPane(this.map).setZIndex = -500;
    this.map.removeControl(this.map.zoomControl); 

    this.waqiUrl = "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=33849d1c7b4e9181661a2ea8a1b7a42d043f0dcc";   
    this.waqiLayer =  L.tileLayer(this.waqiUrl);   
    this.map.addLayer(this.waqiLayer);



  }
  remAqi = () => {
    this.map.removeLayer(this.waqiLayer);
  }
  addAqi = () => {
    this.map.addLayer(this.waqiLayer);
  }
  flyTo = async (latitude, longitude) => {
    this.remAqi();
    this.map.flyTo({lat: latitude, lng: longitude}, 10);
    setTimeout(this.addAqi, 3000);
  }
}

export { leafletMap };

// add to the head of the html document
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
//  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
//  crossorigin=""/>

// add to the head *after* the css
//<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
//  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
//  crossorigin=""></script>