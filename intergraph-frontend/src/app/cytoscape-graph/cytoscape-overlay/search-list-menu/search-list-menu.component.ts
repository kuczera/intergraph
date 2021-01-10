import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CytoscapeInformationComponent} from '../cytoscape-information/cytoscape-information.component';
import {NodeDefinition} from 'cytoscape';
import {GraphBuilderService} from '../../services/graphbuilder/graph-builder.service';

@Component({
  selector: 'app-search-list-menu',
  templateUrl: './search-list-menu.component.html',
  styleUrls: ['./search-list-menu.component.css']
})
export class SearchListMenuComponent implements OnInit {

  @ViewChild('informationContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  informationContainer: ComponentRef<any>;

  @Input()
  node: NodeDefinition = {
    data: { }
  };

  nodeExists = true;
  showInfocard: boolean;

  constructor(
    private resolver: ComponentFactoryResolver,
    private graphBuilderService: GraphBuilderService
  ) { }

  ngOnInit(): void {
    this.showInfocard = false;
  }



  toggleInfocard(): void {
    if (!this.showInfocard) {
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(CytoscapeInformationComponent);
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
}
