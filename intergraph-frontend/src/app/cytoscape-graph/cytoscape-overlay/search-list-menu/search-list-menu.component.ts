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

  @ViewChild('informationContainer', {read: ViewContainerRef}) informationContainer: ViewContainerRef;
  informationComponent: ComponentRef<any>;

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

      const elementId = Number(element.data.id);
      if (elementId === Number(this.node.data.id)) {
        console.log('true');
        this.nodeExists = true;
      } else {
        console.log('false');
        this.nodeExists = false;
      }
    });
    this.showInfocard = false;
  }



  toggleInfocard(): void {
    if (!this.showInfocard) {
      this.graphBuilderService.createNodeInformation(this.node);
      /*
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(CytoscapeInformationDraggableComponent);
      this.informationComponent = this.informationContainer.createComponent(factory);
      this.informationComponent.instance.node = this.node;
      this.informationComponent.instance.draggable = false;
      this.showInfocard = true;*/
    } else {
      this.showInfocard = false;
      this.informationContainer.clear();
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
