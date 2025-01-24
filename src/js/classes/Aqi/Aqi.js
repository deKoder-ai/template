'use strict';

import html from './aqi.html';
import css from './aqi.css';

class Aqi {
  constructor() {
    this.html = html;
    this.url = 'https://api.waqi.info/feed/geo:';
    this.key = '33849d1c7b4e9181661a2ea8a1b7a42d043f0dcc';
    this.colors = [
      '#228B22',
      '#F6AE2D',
      '#df5200',
      '#9e2828',
      '#3A2449',
      '#071E22',
    ];
    return this;
  }
  buildRequest = () => {
    const request = `${this.url}${this.latitude};${this.longitude}/?token=${this.key}`;
    return request;
  };
  fetchData = async (latitude, longitude) => {
    console.log(latitude)
    console.log(longitude)
    this.latitude = latitude;
    this.longitude = longitude;
    const request = this.buildRequest();
    const response = await fetch(request);
    const data = await response.json();
    const daily = data.data.forecast.daily;
    const color = this.calcColor(data.data.aqi);
    const health = this.calcHealth(color);
    this.aqiData = {
      name: data.data.city.name.toUpperCase(),
      aqi: data.data.aqi,
      dominant: data.data.dominentpol,
      health: health,
      color: color,
      updateDay: this.getDayFromIso(data.data.time.iso),
      updateTime: this.getTimeFromIso(data.data.time.iso),
      avgPM25: daily.pm25[2].avg,
      avgPM10: daily.pm10[2].avg,
      dailyPM25: daily.pm25,
      dailyPM10: daily.pm10,
    };
    if (!this.elements) {
      this.getElements();
    }
    this.updateDom(this.aqiData);
    this.updatePM25Graph(this.aqiData.dailyPM25);
    this.updatePM10Graph(this.aqiData.dailyPM10);
  };
  calcHealth = (color) => {
    let health = [
      'Good',
      'Moderate',
      'Unhealthy for Sensitive Groups',
      'Unhealthy',
      'Very Unhealthy',
      'Hazardous',
    ];
    return health[color];
  };
  calcColor = (aqi) => {
    let color = 0;
    if (aqi < 51) {
      color = 0;
    } else if (aqi < 101) {
      color = 1;
    } else if (aqi < 151) {
      color = 2;
    } else if (aqi < 201) {
      color = 3;
    } else if (aqi < 301) {
      color = 4;
    } else if (aqi > 300) {
      color = 5;
    }
    return color;
  };
  getDayFromIso = (iso) => {
    const datetime = new Date(iso);
    const day = datetime.toLocaleString('default', { weekday: 'long' });
    return day;
  };
  getTimeFromIso = (iso) => {
    const datetime = new Date(iso);
    const time = datetime.toLocaleString('default', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return time;
  };
  updateDom = (data) => {
    this.aqiLocationDispl.innerText = `${data.name}`;
    this.aqiMainDispl.innerText = `${data.aqi}`;
    this.aqiHealthDispl.innerText = `${data.health}`;
    this.aqiDisplInfo.style.backgroundColor = this.colors[data.color];
    this.aqiUpdatedDispl.innerText = `Updated on ${data.updateDay} at ${data.updateTime}`;
    this.aqiPm25TitleDispl.innerText = `PM2.5 ${data.avgPM25}`;
    this.aqiPm10TitleDispl.innerText = `PM10 ${data.avgPM10}`;
  };
  updatePM25Graph = (data) => {
    const heights = this.calcBarHeights(data);
    const colors = this.calcBarColor(data);
    this.aqiPm25Col1.style.height = `${heights[0]}%`;
    this.aqiPm25Col1.style.backgroundColor = `${colors[0]}`;
    this.aqiPm25Col2.style.height = `${heights[1]}%`;
    this.aqiPm25Col2.style.backgroundColor = `${colors[1]}`;
    this.aqiPm25Col3.style.height = `${heights[2]}%`;
    this.aqiPm25Col3.style.backgroundColor = `${colors[2]}`;
    this.aqiPm25Col4.style.height = `${heights[3]}%`;
    this.aqiPm25Col4.style.backgroundColor = `${colors[3]}`;
    this.aqiPm25Col5.style.height = `${heights[4]}%`;
    this.aqiPm25Col5.style.backgroundColor = `${colors[4]}`;
    this.aqiPm25Col6.style.height = `${heights[5]}%`;
    this.aqiPm25Col6.style.backgroundColor = `${colors[5]}`;
    this.aqiPm25Col7.style.height = `${heights[6]}%`;
    this.aqiPm25Col7.style.backgroundColor = `${colors[6]}`;
  };
  updatePM10Graph = (data) => {
    const heights = this.calcBarHeights(data);
    const colors = this.calcBarColor(data);
    this.aqiPm10Col1.style.height = `${heights[0]}%`;
    this.aqiPm10Col1.style.backgroundColor = `${colors[0]}`;
    this.aqiPm10Col2.style.height = `${heights[1]}%`;
    this.aqiPm10Col2.style.backgroundColor = `${colors[1]}`;
    this.aqiPm10Col3.style.height = `${heights[2]}%`;
    this.aqiPm10Col3.style.backgroundColor = `${colors[2]}`;
    this.aqiPm10Col4.style.height = `${heights[3]}%`;
    this.aqiPm10Col4.style.backgroundColor = `${colors[3]}`;
    this.aqiPm10Col5.style.height = `${heights[4]}%`;
    this.aqiPm10Col5.style.backgroundColor = `${colors[4]}`;
    this.aqiPm10Col6.style.height = `${heights[5]}%`;
    this.aqiPm10Col6.style.backgroundColor = `${colors[5]}`;
    this.aqiPm10Col7.style.height = `${heights[6]}%`;
    this.aqiPm10Col7.style.backgroundColor = `${colors[6]}`;
  };
  calcBarHeights = (data) => {
    let heights = [];
    for (let i = 0; i < data.length; i++) {
      let height = (data[i].avg / 250) * 100;
      height = Math.min(height, 100);
      heights.push(height);
    }
    return heights;
  };
  calcBarColor = (data) => {
    let colors = [];
    for (let i = 0; i < data.length; i++) {
      let color = this.calcColor(data[i].avg);
      color = this.colors[color];
      colors.push(color);
    }
    return colors;
  };
  getElements = () => {
    this.elements = true;
    this.aqiLocationDispl = document.getElementById('aqi-location');
    this.aqiDisplInfo = document.getElementById('aqi-display');
    this.aqiMainDispl = document.getElementById('aqi-main');
    this.aqiHealthDispl = document.getElementById('aqi-health');
    this.aqiUpdatedDispl = document.getElementById('aqi-updated');
    this.aqiPm25TitleDispl = document.getElementById('pm25-col-0');
    this.aqiPm25Col1 = document.getElementById('pm25-col-1');
    this.aqiPm25Col2 = document.getElementById('pm25-col-2');
    this.aqiPm25Col3 = document.getElementById('pm25-col-3');
    this.aqiPm25Col4 = document.getElementById('pm25-col-4');
    this.aqiPm25Col5 = document.getElementById('pm25-col-5');
    this.aqiPm25Col6 = document.getElementById('pm25-col-6');
    this.aqiPm25Col7 = document.getElementById('pm25-col-7');
    this.aqiPm10TitleDispl = document.getElementById('pm10-col-0');
    this.aqiPm10Col1 = document.getElementById('pm10-col-1');
    this.aqiPm10Col2 = document.getElementById('pm10-col-2');
    this.aqiPm10Col3 = document.getElementById('pm10-col-3');
    this.aqiPm10Col4 = document.getElementById('pm10-col-4');
    this.aqiPm10Col5 = document.getElementById('pm10-col-5');
    this.aqiPm10Col6 = document.getElementById('pm10-col-6');
    this.aqiPm10Col7 = document.getElementById('pm10-col-7');
  };
  setColors = (colorArray6) => {
    this.colors = colorArray6;
  };
}

export { Aqi };
