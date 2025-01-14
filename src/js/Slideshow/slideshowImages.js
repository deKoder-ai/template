'use strict'
import { F } from '../Functions';

import ss1 from './img/ss-1.jpg';
import ss2 from './img/ss-2.jpg';
import ss3 from './img/ss-3.jpg';
import ss4 from './img/ss-4.jpg';
import ss5 from './img/ss-5.jpg';
import ss6 from './img/ss-6.jpg';
import ss7 from './img/ss-7.jpg';
import ss8 from './img/ss-8.jpg';

function ssImageArray(container) {
  const ssImg1 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg1.src = ss1;
  const ssImg2 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg2.src = ss2;
  const ssImg3 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg3.src = ss3;
  const ssImg4 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg4.src = ss4;
  const ssImg5 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg5.src = ss5;
  const ssImg6 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg6.src = ss6;
  const ssImg7 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg7.src = ss7;
  const ssImg8 = F.htmlElement('img', '', ['ss-img', 'ss-border-radius', 'fade']);
  ssImg8.src = ss8;
  
  const images = [ssImg1, ssImg2, ssImg3, ssImg4, ssImg5, ssImg6, ssImg7, ssImg8];
  
  for (let i = 0; i < images.length; i++) {
    images[i].id = `ss-img-${i}`;
    images[i].style.display = 'none';
    container.appendChild(images[i]);
  }
  images[0].style.display = 'block';

  return images;
}

export { ssImageArray };
