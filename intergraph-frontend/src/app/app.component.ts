import {SettingsService} from './services/settings/settings.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ElementDataDefinition, ElementDefinition, ElementsDefinition} from 'cytoscape';
import {CytoscapeGraphComponent} from './cytoscape-graph/cytoscape-graph.component';
import {MapCanvasComponent} from './map-canvas/map-canvas.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('cyto') cytoscape: CytoscapeGraphComponent;
  @ViewChild('map') mapcanvas: MapCanvasComponent;

  isCytoscapeSelected = true;
  isMapcanvasSelected = false;
  mapElements: ElementDefinition[];
  appVisible: boolean;

  constructor(
    private settingsService: SettingsService
  ) {
    this.appVisible = false;
    // load and cache settings
    this.settingsService.loadSettings().subscribe(settings =>
      {
        this.settingsService.cacheSettings(settings);
        this.appVisible = true;
      }
    );
  }

  selectCytoscape(): void {
    this.isCytoscapeSelected = true;
    this.isMapcanvasSelected = false;
  }

  selectMapcanvas(): void {
    this.isCytoscapeSelected = false;
    this.isMapcanvasSelected = true;
  }

  getElements(): ElementDefinition[] {
    return this.mapElements;
  }

  openMap(elements: ElementDefinition[]): void {
    this.mapElements = elements;
    this.isCytoscapeSelected = false;
    this.isMapcanvasSelected = true;
  }
}
