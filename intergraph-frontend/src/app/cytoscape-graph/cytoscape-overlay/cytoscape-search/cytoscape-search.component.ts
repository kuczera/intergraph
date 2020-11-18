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
import {IFilterLabel} from '../../../filter-label';

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
  filterLabels: IFilterLabel[];
  filter = 'Regesta';


  constructor(
    private elementDataService: ElementDataService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.showSearchResult = true;
    this.showActiveSearchResult = false;
    this.getLabels();
  }



  ngAfterViewInit(): void {

    // ExpressionChangedAfterItHasBeenCheckedError - fix
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
  }


  searchNodes(): void {

    console.log(this.filterLabels);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.showSearchResult = false;
    this.elementDataService.searchNodes(this.searchText, this.filter)
      .subscribe((result) => {
        this.searchResult = result;
        this.showSearchResult = true;
        console.log(result);
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



  getLabels(): void {
    this.elementDataService.getDatabaseLabels()
      .subscribe((data) => {
        this.filterLabels = data;
        this.filterLabels.push({"name": "Any"});
        this.filterLabels.push({"name": "Entity"});
        console.log(data);
      });

  }



}
