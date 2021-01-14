import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CytoscapeInformationDraggableComponent } from './cytoscape-information/cytoscape-information-draggable/cytoscape-information-draggable.component';
import { GraphBuilderService } from '../services/graphbuilder/graph-builder.service';
import { NodeDefinition } from 'cytoscape';



@Component({
  selector: 'app-cytoscape-overlay',
  templateUrl: './cytoscape-overlay.component.html',
  styleUrls: ['./cytoscape-overlay.component.css'],
  providers: []
})
export class CytoscapeOverlayComponent implements OnInit {

  @ViewChild('nodeInformation', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  @ViewChild('searchComponent')
  elementRef: ElementRef;

  showSearch: boolean;
  showInformation: boolean;
  showConfig: boolean;

  constructor(
    private resolver: ComponentFactoryResolver,
    private graphBuilderService: GraphBuilderService
  ) {

  }



  ngOnInit(): void {
    this.showSearch = false;
    this.showInformation = false;
    this.showConfig = false;

    this.graphBuilderService.onNodeTap(this.createNodeInformation.bind(this));
  }



  toggleSearch(): void {
    if (!this.showSearch) {
      this.showSearch = true;
      this.showInformation = false;
      this.showConfig = false;
    } else {
      this.showSearch = false;
    }
    this.toggleInformationElements();
  }



  toggleInformation(): void {
    if (!this.showInformation) {
      this.showSearch = false;
      this.showInformation = true;
      this.showConfig = false;
    } else {
      this.showInformation = false;
    }
    this.toggleInformationElements();
  }



  toggleConfig(): void {
    if (!this.showConfig) {
      this.showSearch = false;
      this.showInformation = false;
      this.showConfig = true;
    } else {
      this.showConfig = false;
    }
    this.toggleInformationElements();
  }



  createNodeInformation(node: NodeDefinition): void {
    const newID = node.data.id + '-draggableInformation';
    if (document.getElementById(newID) === null) {
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(CytoscapeInformationDraggableComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.node = node;
      this.graphBuilderService.addToOpenInformationContainerIds(newID);
      if (!this.showInformation) {
        // timeout since view is creating div slower than toggling works
        setTimeout(() => {
          this.toggleInformation();
        });
      }
    }
  }



  toggleInformationElements(): void {
    this.graphBuilderService.openInformationContainerIds.forEach((id: string) => {
      if (this.showInformation) {
        document.getElementById(id).style.visibility = 'visible';
      } else {
        document.getElementById(id).style.visibility = 'hidden';
      }
    });
  }

}
