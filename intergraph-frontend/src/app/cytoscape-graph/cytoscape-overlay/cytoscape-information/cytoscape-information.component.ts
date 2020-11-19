import {AfterViewInit, Component, Input} from '@angular/core';
import {nodeConfig} from '../../../intergraph/nodeConfig';
import {KeyValue} from '@angular/common';
import {GraphBuilderService} from '../../services/graphbuilder/graph-builder.service';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {EdgeDefinition, ElementDefinition, NodeDefinition} from 'cytoscape';
import {style} from '../../../intergraph/cytoscapeOptions';

@Component({
  selector: 'app-cytoscape-information',
  templateUrl: './cytoscape-information.component.html',
  styleUrls: ['./cytoscape-information.component.css']
})
export class CytoscapeInformationComponent implements AfterViewInit{

  // needs empty Input since it's throwing an error if the component isn't used
  @Input()
  node: NodeDefinition = {
    data: { }
  };
  displayToken: string;
  properties: Map<string, any> = new Map<string, any>();
  showData: boolean;
  relatedNodes: ElementDefinition[][] = [];
  relations: EdgeDefinition[] = [];
  relatedNodesByClass: Map<string, number> = new Map<string, number>();
  relationsByType: Map<string, number> = new Map<string, number>();
  propertyToDisplay: KeyValue<string, any>;
  nodeExists: boolean;
  nodeColor = ['blue', 'red', 'yellow', 'black', 'green', 'purple', 'orange', 'brown', 'blue', 'red', 'yellow'];
  labelsMatchedWithColors = [];

  constructor(
    private graphBuilderService: GraphBuilderService,
    private elementDataService: ElementDataService
  ) {
    this.showData = false;
  }

  ngOnInit() : void {
    let filterLabel = [
      {"name": "Regesta"},
      {"name": "IndexPlace"},
      {"name": "IndexEntry"},
      {"name": "IndexEvent"},
      {"name": "IndexPerson"},
      {"name": "IndexThing"},
      {"name": "Action"},
      {"name": "ExternalResource"},
      {"name": "Literature"},
      {"name": "Reference"},
      {"name": "Place"},
    ];

    if (filterLabel.length == this.nodeColor.length) {
      for (let i in filterLabel) {
        this.labelsMatchedWithColors.push({"name": filterLabel[i].name, "color": this.nodeColor[i]});
      }
    }
  }


  ngAfterViewInit(): void {
    // this timeout handles the ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      // with this config the node name is set
      for (const key in nodeConfig) {
        if (key === this.node.classes) {
          const value = nodeConfig[key];
          this.displayToken = this.node.data[value];
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

  // return colors matching with the node classe
  applyColorForNode(typeOfNode: string): string {

    for (let entry of this.labelsMatchedWithColors) {
      if (entry.name === typeOfNode) {
        return entry.color;
      }
    }
    return 'white';
  }



  addNode(): void {
    this.graphBuilderService.addNodeWithRelations(this.node);
    this.nodeExists = true;
  }

  addNodesByType(type: string): void {
    this.elementDataService.getRelatedNodesByType(this.node.data.id, type).subscribe((result: ElementDefinition[]) => {
      result.forEach((element: ElementDefinition) => {
        this.graphBuilderService.addElement(element);
      });
    });
  }

  removeNode(): void {
    this.graphBuilderService.removeElement(this.node);
    this.nodeExists = false;
  }

  toggleProperty(property?: KeyValue<string, any>): void {
    if (property) {
      this.propertyToDisplay = property;
      this.showData = true;
    } else {
      this.showData = false;
    }
  }


}
