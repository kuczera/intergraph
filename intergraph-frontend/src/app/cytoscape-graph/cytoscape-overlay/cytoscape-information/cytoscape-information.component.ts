import {AfterViewInit, OnInit, Component, Input} from '@angular/core';
import {KeyValue} from '@angular/common';
import {GraphBuilderService} from '../../services/graphbuilder/graph-builder.service';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {EdgeDefinition, ElementDefinition, NodeDefinition} from 'cytoscape';

@Component({
  selector: 'app-cytoscape-information',
  templateUrl: './cytoscape-information.component.html',
  styleUrls: ['./cytoscape-information.component.css']
})
export class CytoscapeInformationComponent implements AfterViewInit, OnInit {

  // needs empty Input since it's throwing an error if the component isn't used
  @Input()
  node: NodeDefinition = { data: {} };
  displayToken: string;
  properties: Map<string, any> = new Map<string, any>();
  showData: boolean;
  relatedNodes: ElementDefinition[][] = [];
  relations: EdgeDefinition[] = [];
  relatedNodesByClass: Map<string, number> = new Map<string, number>();
  relationsByType: Map<string, number> = new Map<string, number>();
  propertyToDisplay: KeyValue<string, any>;
  nodeExists: boolean;
  lenTrunc: number;
  minimized = false;

  constructor(
    private graphBuilderService: GraphBuilderService,
    private elementDataService: ElementDataService,
    private settingsService: SettingsService
  ) {
    this.showData = false;
    this.lenTrunc = 20;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this timeout handles the ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.displayToken = ""; // default
      for (var key of this.settingsService.getNodeClasses()) {
        if ((this.node.classes as string).includes(key)) {
          var x = this.node.data[this.settingsService.getSetting(key,'title')];
          if (x !== undefined) this.displayToken = x;
        }
      }

      for (const key of Object.keys(this.node.data)){
        this.properties.set(key, this.node.data[key]);
      }
      // display the correct button to add or remove
      this.graphBuilderService.checkForExistence(this.node)
        ? this.nodeExists = true
        : this.nodeExists = false;

      this.elementDataService.getRelations(this.node.data.id)
        .subscribe((result: EdgeDefinition[]) => {
          result.forEach((edge: EdgeDefinition) => {
            if (this.relationsByType.get(edge.data.type) === undefined) {
              this.relationsByType.set(edge.data.type, 1);
            } else {
              this.relationsByType.set(
                edge.data.type, this.relationsByType.get(edge.data.type) + 1
              );
            }
          });
        });
    });
  }

  toggleProperty(property?: KeyValue<string, any>): void {
    if (property.value.length > this.lenTrunc) {
      this.propertyToDisplay = property;
      this.showData = true;
    } else {
      this.showData = false;
    }
  }

  toggleInfocard(): void {
    this.showData = false;
  }

  // Minimizing info card by Toggle
  toggleMinimize(): void {
    this.minimized = !this.minimized;
    // As double clicking automatically selects text in infocard, we unselect
    if (window.getSelection) { window.getSelection().removeAllRanges(); }
  }

  redirectToUrl(): void {
    window.open(this.node.data.url);
  }
}
