import {AfterViewInit, ApplicationRef, Component, Host, Input, OnInit} from '@angular/core';
import {ElementDataService} from '../services/ElementData/element-data.service';
import {ElementDefinition, ElementsDefinition} from 'cytoscape';
import {AppComponent} from '../app.component';

import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import Overlay from 'ol/Overlay';

import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

import {Style, Fill, Stroke} from 'ol/style';

import {group} from '@angular/animations';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.css']
})
export class MapCanvasComponent implements OnInit {

  private map: Map;
  private style: Style;
  private chart: Chart;
  private data = {labels: [], datasets: []};
  private chartConfig;
  private tooltipOverlay: Overlay;

  constructor(@Host() private app: AppComponent) { }

  ngOnInit(): void {
    const data = this.app.getElements();
    this.initMap(data);
    this.initChart(data);
  }

  initMap(data: ElementDefinition[]): void {
    this.map = new Map({
      target: 'map',
      layers: [ new TileLayer({source: new OSM()}) ],
      view: new View({center: [0, 0], zoom: 2}),
    });

    this.style = new Style({
      stroke: new Stroke({
        color: 'blue', width: 3}),
      fill: new Fill({color: 'rgba(0, 0, 255, 0.1)'})
    });

    const groupCircles = {};
    data.forEach(el => {
      if (el.data.latitude === undefined || el.data.longitude === undefined) {
        return;
      }
      const [lat, lon] = [el.data.latitude, el.data.longitude];
      const key = `${lat},${lon}`;
      if (key in groupCircles) {
        groupCircles[key].count++;
      } else {
        groupCircles[key] = { count: 1, coord: fromLonLat([lon, lat]), label: el.data.label };
      }
    });

    const source = new VectorSource({projection: 'EPSG:4326', features: []});
    Object.values(groupCircles).forEach(({count, coord, label}) => {
      const circle = new Feature(new Circle(coord, Math.min(100000, count * 100000)));
      circle.setStyle(this.style);
      circle.setProperties({label: `${label}: ${count}`});
      source.addFeature(circle);
    });

    this.tooltipOverlay = new Overlay({element: document.querySelector('#tooltip'), offset: [10, 0], positioning: 'bottom-left'});

    this.map.addLayer(new VectorLayer({source, style: this.style}));
    this.map.addOverlay(this.tooltipOverlay);

    this.map.on('pointermove', evt => {
    });
  }

  initChart(elements: ElementDefinition[]): void {
    this.data = {labels: [], datasets: []};
    this.chartConfig = {
      type: 'line',
      responsive: true,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {text: 'Chart.js Time Scale'},
        scales: {
          x: {
            type: 'time',
            time: {unit: 'year', parser: 'YYYY'},
            scaleLabel: {display: true, labelString: 'Date'}
          },
          y: {
            scaleLabel: {display: true, labelString: 'value'}
          }
        },
      }
    };
    this.chart = new Chart('chart', this.chartConfig);

    const backgroundColor = 'rgba(255, 127, 0, 0.20)';
    const borderColor = 'rgb(255, 127, 0)';
    const labels = [];
    const data = {};
    elements.forEach(el => {
      if (el.data.startDate === undefined || el.data.endDate === undefined) {
        return;
      }
      const [t1, t2] = [el.data.startDate.toString(), el.data.endDate.toString()];
      if (!(t1 in data)) {
        data[t1] = 0;
        labels.push(t1);
      }
      if (!(t2 in data)) {
        data[t2] = 0;
        labels.push(t2);
      }
    });

    elements.forEach(el => {
      if (el.data.startDate === undefined || el.data.endDate === undefined) {
        return;
      }
      const [t1, t2] = [el.data.startDate.toString(), el.data.endDate.toString()];
      labels.forEach(lab => {
        if (t1 <= lab  && lab <= t2){
          data[lab] ++;
        }
      });
    });

    labels.sort();
    const yData = labels.map(t => data[t]);
    this.data.labels = labels;
    this.data.datasets = [{label: 'number of regesta over time', data: yData, backgroundColor, borderColor}];

    this.chart.update();
  }
}
