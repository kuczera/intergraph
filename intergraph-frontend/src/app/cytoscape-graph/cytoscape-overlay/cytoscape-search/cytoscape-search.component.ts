import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {CytoscapeInformationComponent} from '../cytoscape-information/cytoscape-information.component';
import {NodeDefinition} from 'cytoscape';

@Component({
  selector: 'app-cytoscape-search',
  templateUrl: './cytoscape-search.component.html',
  styleUrls: ['./cytoscape-search.component.css']
})
export class CytoscapeSearchComponent implements OnInit, AfterViewInit {


  @ViewChild('informationContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  informationContainer: ComponentRef<any>;

  @ViewChild('searchInput')
  searchInput: ElementRef;

  searchText = '';
  showSearchResult: boolean;
  searchResult: NodeDefinition[];
  activeSearchResult: NodeDefinition;
  showActiveSearchResult: boolean;


  constructor(
    private elementDataService: ElementDataService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.showSearchResult = true;
    this.showActiveSearchResult = false;
  }

  ngAfterViewInit(): void {

    // ExpressionChangedAfterItHasBeenCheckedError - fix
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
  }


  searchNodes(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.showSearchResult = false;
    this.elementDataService.searchNodes(this.searchText)
      .subscribe((result) => {
        this.searchResult = result;
        this.showSearchResult = true;
      });
  }

  showInformation(node: NodeDefinition): void {
    if (!this.showActiveSearchResult) {
      this.showActiveSearchResult = true;
      this.activeSearchResult = node;
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(CytoscapeInformationComponent);
      this.informationContainer = this.container.createComponent(factory);
      this.informationContainer.instance.node = node;
      this.informationContainer.instance.draggable = false;
    } else {
      if (this.activeSearchResult === node) {
        this.showActiveSearchResult = false;
        this.container.clear();
      } else {
        this.container.clear();
        this.activeSearchResult = node;
        const factory: ComponentFactory<any> =
          this.resolver.resolveComponentFactory(CytoscapeInformationComponent);
        this.informationContainer = this.container.createComponent(factory);
        this.informationContainer.instance.node = node;
        this.informationContainer.instance.draggable = false;
      }
    }
  }


}
