import {Injectable} from '@angular/core';
import * as cy from 'cytoscape';
import {CytoscapeOptions, EdgeDefinition, ElementDefinition, NodeDefinition} from 'cytoscape';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {first} from 'rxjs/operators';
const cola = require('cytoscape-cola');
const dage = require('cytoscape-dagre');

@Injectable()
export class GraphBuilderService {

  cyGraph: cy.Core;
  graphContainer: HTMLElement;

  elements: ElementDefinition[] = [];
  options: CytoscapeOptions = {

  };

  private createNodeInformation: (evt: any) => void;


  openInformationContainerIds: string[] = [];

  constructor(private elementDataService: ElementDataService) { }


  setGraphContainerElement(graphContainer: HTMLElement): void{
    this.graphContainer = graphContainer;
  }

  initGraph(): void {
    cy.use(cola);
    this.cyGraph = cy({
      container: this.graphContainer,
      layout: {
        name: 'cola'
      },
      style: [
        {
          selector: 'node',
          style: {
            label: 'id'
          }
        },
        {
          selector: 'edge',
          style: {
            label: 'data(type)'
          }
        },
        {
          selector: '.Action',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(action)'
          }
        },
        {
          selector: '.Regesta',
          style: {
            shape: 'round-diamond',
            'background-color': 'green',
            label: 'data(action)'
          }
        },
        {
          selector: '.ExternalResource',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(title)'
          }
        },
        {
          selector: '.IndexEntry',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(label)'
          }
        },
        {
          selector: '.IndexEvent',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(label)'
          }
        },
        {
          selector: '.IndexThing',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(label)'
          }
        },
        {
          selector: '.IndexPerson',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(label)'
          }
        },
        {
          selector: '.IndexPlace',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(label)'
          }
        },
        {
          selector: '.Literature',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(title)'
          }
        },
        {
          selector: '.Place',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(normalizedGerman)'
          }
        },
        {
          selector: '.Reference',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(title)'
          }
        },
        {
          selector: '.Regesta',
          style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(identifier)'
          }
        },
      ]
    });

    this.cyGraph.on('tap', 'node', (evt: any) => {
      this.createNodeInformation(this.getElement(evt.target.data().id));
    });
  }

  onNodeTap(fn: (evt: any) => void): void {
    this.createNodeInformation = fn;
  }

  // add a single element
  addElement(element: ElementDefinition): void {
    if (!this.checkForExistence(element)) {
      this.cyGraph.add(element);
      this.elements.push(element);
      this.cyGraph.layout({name: 'cola'}).run();
    }
  }

  // add a node
  async addNodeWithRelations(element: NodeDefinition): Promise<void> {
    if (!this.checkForExistence(element)) {
      const relations: EdgeDefinition[] = [];
      await this.elementDataService.getRelations(element.data.id)
        .pipe(first()).toPromise()
        .then((result: EdgeDefinition[]) => {
          result.forEach((edge) => {
            this.elements.forEach((existingElement: ElementDefinition) => {
              if (
                // source and target are in number format (whyever)
                existingElement.data.id === edge.data.target.toString() ||
                existingElement.data.id === edge.data.source.toString()
              ) {
                relations.push(edge);
              }
            });
          });
        });


      this.cyGraph.add(element);
      this.elements.push(element);
      this.cyGraph.add(relations);
      relations.forEach((edge: EdgeDefinition) => {
        this.elements.push(edge);
      });
      this.cyGraph.layout({name: 'cola'}).run();
    }
  }


  removeElement(element: ElementDefinition): void {
    if (this.checkForExistence(element)) {
      this.cyGraph.remove(this.cyGraph.getElementById(element.data.id));
      this.elements.splice(this.elements.indexOf(element, 0), 1);
      this.cyGraph.layout({name: 'cola'}).run();
    }
  }

  checkForExistence(element: ElementDefinition): boolean {
    return this.cyGraph.hasElementWithId(element.data.id);
  }

  getElement(id: string): ElementDefinition {
    return this.elements.find((element: ElementDefinition) =>
      element.data.id === id
    );
  }

  // Helper for the View
  addToOpenInformationContainerIds(id: string): void {
    this.openInformationContainerIds.push(id);
  }

  // Helper for the View
  removeFromOpenInformationContainerIds(id: string): void {
    this.openInformationContainerIds.splice(
      this.openInformationContainerIds.indexOf(id, 0 ), 1);
  }

  filterGraph(startDate: number, endDate: number): void {
    this.elements.forEach((element: ElementDefinition) => {

      let elementDate = new Date(element.data.date);
      console.log(this.cyGraph.layout({name: 'cola'}));
      if (elementDate.getTime() < startDate || elementDate.getTime() > endDate) {
        this.cyGraph.getElementById(element.data.id).style('display', 'none');
      } else {
        this.cyGraph.getElementById(element.data.id).style('display', 'element');
      }
    });
  }
}
