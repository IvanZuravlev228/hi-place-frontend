import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private map!: L.Map;
  @Input() lat: number = 0;
  @Input() lon: number = 0;
  private zoom: number = 20;
  private iconSize: number = 40;
  private pathToMapPointerImage: string = "./assets/image/icons/map-pointer.png";
  private sizeMap: string = "100%";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMap();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.renderMap();
  }

  private renderMap() {
    this.map = L.map('map').setView([this.lat, this.lon], this.zoom);
    this.map.getContainer().style.width = this.sizeMap;
    this.map.getContainer().style.height = this.sizeMap;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> HiPlace'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: this.pathToMapPointerImage,
      iconSize: [this.iconSize, this.iconSize], // размер иконки
    });

    L.marker([this.lat, this.lon], ).addTo(this.map)
      .setIcon(customIcon)
      .openPopup();

    // CUSTOM MAP POINTER
    // const popupContent = `
    //     <h3>Title</h3>
    //     <p>Additional information</p>
    // `;
    //
    // const tooltipContent = 'Tooltip text';
    // const marker = L.marker([this.lat, this.lon], ).addTo(this.map)
    //   .setIcon(customIcon)
    //   .bindTooltip(tooltipContent)
    //   .bindPopup(popupContent)
    //   .openPopup();
    // marker.on('click', () => {
    //   console.log('Marker clicked');
    // });
    //
    // marker.on('mouseover', () => {
    //   marker.openPopup();
    // });
  }

  private updateMap(): void {
    if (this.map) {
      this.map.remove();
      this.renderMap();
    }
  }
}
