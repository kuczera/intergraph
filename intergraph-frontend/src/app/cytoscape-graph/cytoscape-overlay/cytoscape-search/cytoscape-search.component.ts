import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, ElementRef, EventEmitter, Host, HostListener,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ElementDataService } from '../../../services/ElementData/element-data.service';
import { CytoscapeInformationComponent } from '../cytoscape-information/cytoscape-information.component';
import { NodeDefinition } from 'cytoscape';
import { IFilterLabel } from '../../../filter-label';
import { SearchListMenuComponent } from '../search-list-menu/search-list-menu.component';
import {SettingsService} from '../../../services/settings/settings.service';

@Component({
  selector: 'app-cytoscape-search',
  templateUrl: './cytoscape-search.component.html',
  styleUrls: ['./cytoscape-search.component.css']
})
export class CytoscapeSearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchMenuContainer', {read: ViewContainerRef}) searchMenuContainer: ViewContainerRef;
  searchMenuComponent: ComponentRef<any>;

  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Output() nodeSelected: EventEmitter<NodeDefinition> = new EventEmitter<NodeDefinition>();

  clickInside: boolean;
  searchText = '';
  showSearchResult: boolean;
  searchResult: NodeDefinition[];
  activeSearchResult: NodeDefinition;
  showActiveSearchResult: boolean;
  filterLabels: IFilterLabel[];
  filter : string;

  constructor(
    private elementDataService: ElementDataService,
    private settingsService: SettingsService,
    private resolver: ComponentFactoryResolver
  ) { }


  ngOnInit(): void {
    this.showSearchResult = true;
    this.showActiveSearchResult = false;
    this.getFilterLabels();
  }


  ngAfterViewInit(): void {

    // ExpressionChangedAfterItHasBeenCheckedError - fix
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
    this.clickInside = false;
  }


  searchNodes(): void {
    if (this.searchText !== '') {   // search text is not empty
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      this.showSearchResult = false;

      // only search if the search setting property is set
      if (this.settingsService.getSetting(this.filter, 'search') !== undefined) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        this.showSearchResult = false;
        this.elementDataService.searchNodes(this.filter, this.settingsService.getSetting(this.filter, 'search'), this.searchText)
          .subscribe((result) => {
            this.searchResult = result;
            this.showSearchResult = true;
          });
      }
    }

  }


  showContextMenu(node: NodeDefinition, evt: any): void {
    if (!this.showActiveSearchResult) {
      this.activeSearchResult = node;

      this.searchMenuContainer.clear();
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(SearchListMenuComponent);
      this.searchMenuComponent = this.searchMenuContainer.createComponent(factory);
      this.searchMenuComponent.instance.node = node;
      this.searchMenuComponent.instance.draggable = false;
      this.searchMenuComponent.instance.show(evt.clientX, evt.clientY);
    }
  }



  getFilterLabels(): void {
    this.elementDataService.getDatabaseLabels()
      .subscribe((data) => {
        this.filterLabels = data;
//        this.filterLabels.push({"name": "Any"});
        this.filter = this.filterLabels[0].name;
      });
  }


  addNodeToSelectionList(node: NodeDefinition): void {
    this.nodeSelected.emit(node);
  }


  @HostListener('document:click', ['$event'])
  clickout(): void {
    if (!this.clickInside) {
      this.searchMenuContainer.clear();
    } else {
      this.clickInside = false;
    }


  }


  @HostListener('click')
  clickinside(): void {
    this.clickInside = true;
  }



}
