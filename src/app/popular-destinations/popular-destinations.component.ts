import {Component, OnInit} from '@angular/core';
import {DestinazioniPopolariService} from "../services/destinazioni-popolari.service";

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css']
})
export class PopularDestinationsComponent implements OnInit{

  popupularDestinations:any = [];

  constructor(private destinazioniPopolariService:DestinazioniPopolariService) {
  }

  ngOnInit(){
    this.getPopularDestinations();
  }

  getPopularDestinations(){
    this.popupularDestinations = this.destinazioniPopolariService.getPopularDestinations();
  }
}
