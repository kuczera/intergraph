import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, HostBinding, Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CytoscapeInformationDraggableComponent } from '../cytoscape-information/cytoscape-information-draggable/cytoscape-information-draggable.component';
import { ElementDefinition, NodeDefinition } from 'cytoscape';
import { GraphBuilderService } from '../../services/graphbuilder/graph-builder.service';



@Component({
  selector: 'app-search-list-menu',
  templateUrl: './search-list-menu.component.html',
  styleUrls: ['./search-list-menu.component.css']
})
export class SearchListMenuComponent implements OnInit {

  @ViewChild('informationContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  informationContainer: ComponentRef<any>;

  @HostBinding('style.left') x = '0px';
  @HostBinding('style.top') y = '0px';
  @HostBinding('style.visibility') visibility = 'hidden';
  @HostBinding('style.position') position = 'absolute';

  @Input()
  node: NodeDefinition = {
    data: { }
  };

  nodeExists: boolean;
  showInfocard: boolean;

  constructor(
    private resolver: ComponentFactoryResolver,
    private graphBuilderService: GraphBuilderService
  ) { }



  ngOnInit(): void {
    // checking if node exists in Cytoscape graph
    this.graphBuilderService.elements.forEach((element: ElementDefinition) => {
      if (element.data.id === this.node.data.id) {
        this.nodeExists = true;
      } else {
        this.nodeExists = false;
      }
    });
    this.showInfocard = false;
  }



  toggleInfocard(): void {
    if (!this.showInfocard) {
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(CytoscapeInformationDraggableComponent);
      this.informationContainer = this.container.createComponent(factory);
      this.informationContainer.instance.node = this.node;
      this.informationContainer.instance.draggable = false;
      this.showInfocard = true;
    } else {
      this.showInfocard = false;
      this.container.clear();
    }

  }



  addNode(): void {
    this.nodeExists = !this.nodeExists;
    this.graphBuilderService.addNodeWithRelations(this.node);

  }



  removeNode(): void {
    this.nodeExists = !this.nodeExists;
    this.graphBuilderService.removeElement(this.node);
  }



  show(x: number, y: number): void {
    this.x = `${x + 10}px`;
    this.y = `${y + 10}px`;
    this.visibility = 'visible';
    this.position = 'absolute';
  }



  hide(): void {
    this.x = `${0}px`;
    this.y = `${0}px`;
    this.visibility = 'hidden';
  }
}
