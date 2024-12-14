import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinazioniPopolariService {

  constructor() { }

  getPopularDestinations() {
    return [
      {
        name: 'Parigi',
        image: 'https://m.ahstatic.com/is/image/accorhotels/aja_p_7046-31:3by2?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=223&qlt=80',
        description: 'La città dell\'amore ti aspetta con le sue meraviglie artistiche e culturali.'
      },
      {
        name: 'New York',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/800px-New_york_times_square-terabass.jpg',
        description: 'Scopri la grande mela, la capitale del mondo.'
      },
      {
        name: 'Tokyo',
        image: 'https://media-assets.vanityfair.it/photos/644c24f7cd60f0ca3be60db8/16:9/w_2580,c_limit/AdobeStock_251121174.jpeg',
        description: 'Vivi l\'esperienza unica di Tokyo, tra modernità e tradizione.'
      }
    ];
  }
}
