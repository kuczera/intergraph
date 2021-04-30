import {Injectable} from '@angular/core';
import * as cy from 'cytoscape';
import { EdgeDefinition, ElementDefinition, NodeDefinition} from 'cytoscape';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {first} from 'rxjs/operators';
const cola = require('cytoscape-cola');
// const dage = require('cytoscape-dagre');

@Injectable()
export class GraphBuilderService {

  cyGraph: cy.Core;
  graphContainer: HTMLElement;
  elements: ElementDefinition[] = [];
  // options: CytoscapeOptions = {};
  highlightedNode = null;
  node;


  public createNodeInformation: (evt: any) => void;
  openInformationContainerIds: string[] = [];

  constructor(
    private elementDataService: ElementDataService,
    private settingsService: SettingsService
  ) { }


  setGraphContainerElement(graphContainer: HTMLElement): void{
    this.graphContainer = graphContainer;
  }

  initGraph(): void {
    cy.use(cola);

    this.cyGraph = cy({
      wheelSensitivity: 0.1,
      maxZoom: 2.5,
      container: this.graphContainer,
      layout: { name: 'cola' },
      style: this.settingsService.getStyleOptions()
    });

    this.cyGraph.on('mouseover', 'node', this.highlightNode);
    this.cyGraph.on('mouseout', 'node', this.unHighlightNode);
//    this.cyGraph.on('boxselect', 'node', this.selectNode);
//    this.cyGraph.on('tap', this.unselectNodes);



    // this.cyGraph.on('tap', 'node', (evt: any) => {
    //   this.createNodeInformation(this.getElement(evt.target.data().id));
    // });
  }

/*  selectNode = (e) => {
    const nodeId = e.target._private.data.id;
    this.node = this.cyGraph.getElementById(nodeId);
    this.node.style('backgroundColor', 'Navy');
    this.node.style("border-width", "2");
    this.node.style("border-color", "yellow");
  }

  unselectNodes = () => {
    this.cyGraph.nodes().map(node => node.style("border-width", "0"));
  }
*/

  highlightNode = (e) => {
    if (this.highlightedNode == null) {
      let highlightedNodeId = e.target._private.data.id;
      this.highlightedNode = this.cyGraph.getElementById(highlightedNodeId);
      this.highlightedNode.style("border-width", "2");
      this.highlightedNode.style("border-color", "yellow");
      this.highlightedNode.style('text-wrap', 'none');
    }
  }

  unHighlightNode = (e) => {
    this.highlightedNode.style("border-width", "0");
    this.highlightedNode.style('text-wrap', 'ellipsis');
    this.highlightedNode = null;
  }



  onNodeTap(fn: (evt: any) => void): void {
    this.createNodeInformation = fn;
  }

  // add a single element
  addElement(element: ElementDefinition): void {
    if (!this.checkForExistence(element)) {
      this.cyGraph.add(element);
      this.cyGraph.getElementById(element.data.id).css({'edge-text-rotation': 'autorotate'});
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
      relations.forEach((edge: EdgeDefinition) => { this.elements.push(edge); });
      this.cyGraph.layout({name: 'cola'}).run();
    }
  }

  removeElement(element: ElementDefinition): void {
    if (this.checkForExistence(element)) {
      this.cyGraph.remove(this.cyGraph.getElementById(element.data.id));
      this.elements.splice(this.elements.indexOf(element, 0), 1);
      // this.cyGraph.layout({name: 'cola'}).run();
    }
  }

  removeAll(): void {
    this.elements.forEach((element) => {
      this.cyGraph.remove(this.cyGraph.getElementById(element.data.id));
      this.elements.splice(this.elements.indexOf(element, 0), 1);
    });
    console.log(this.elements);
    this.elements.forEach((element) => {
      this.cyGraph.remove(this.cyGraph.getElementById(element.data.id));
      this.elements.splice(this.elements.indexOf(element, 0), 1);
    });
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

  // Filtering nodes in graph
  filterGraph(startDate: number, endDate: number): void {
    this.elements.forEach((element: ElementDefinition) => {

      const elementDate = new Date(element.data.endDate);

      if (!isNaN(elementDate.getTime())) { // Invalid date
        if (elementDate.getTime() < startDate || elementDate.getTime() > endDate) {
          this.cyGraph.getElementById(element.data.id).style('display', 'none');
        } else {
          this.cyGraph.getElementById(element.data.id).style('display', 'element');
        }
      }

    });
  }

  //
  // PARSING ELEMENT DEFINITIONS
  //

  getElements(): ElementDefinition[] {
    return this.elements;
  }

  getElementById(id: string): ElementDefinition {
    return this.getElement(id);
  }

  getVisibleElements(): ElementDefinition[] {
    return this.elements;
  }

  getSelectedElements(): ElementDefinition[] {
    const selectedElements: ElementDefinition[] = [];

    const cySelectedElements = this.cyGraph.$(':selected');
    cySelectedElements.forEach(cySelectedElement => {
      if (cySelectedElement.isNode()) {
        const id = cySelectedElement.data().id;
        const selectedElement = this.getElementById(id);
        selectedElements.push(selectedElement);
      }
    });

    return selectedElements;
  }

  //
  // CSV EXPORT
  //

  exportElementsToCSV(elements: ElementDefinition[]): void {
    const content: string[][] = [];
    console.log(elements);
    elements.forEach((element: ElementDefinition) => {
      const identifier = element.data.identifier;
      const url = element.data.url;
        if (url != null) {
          content.push([identifier, url]);
        }
        else content.push([identifier, "(no URL)"]);
    });

    const csvHeader = 'data:text/csv;charset=utf-8,';
    if (content.length > 0) {
      const csvContent = content.map(row => row.join(';')).join('\n');
      const encodedUri = encodeURI(csvHeader + csvContent);

      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  exportAllToCSV(): void {
    this.exportElementsToCSV(this.elements);
  }

  exportVisibleElementsToCSV(): void {
    const elements: ElementDefinition[] = [];
    this.elements.forEach(element => {
      const isVisible = true;
      if (isVisible) {
        elements.push(element);
      }
    });
    this.exportElementsToCSV(elements);
  }

  exportSelectionToCSV(): void {
    const elements: ElementDefinition[] = this.getSelectedElements();
    this.exportElementsToCSV(elements);
  }
}
