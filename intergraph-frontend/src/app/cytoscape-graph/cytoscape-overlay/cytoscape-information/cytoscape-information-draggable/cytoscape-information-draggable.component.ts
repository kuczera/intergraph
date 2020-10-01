import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GraphBuilderService} from '../../../services/graphbuilder/graph-builder.service';
import {NodeDefinition} from 'cytoscape';

@Component({
  selector: 'app-cytoscape-information-draggable',
  templateUrl: './cytoscape-information-draggable.component.html',
  styleUrls: ['./cytoscape-information-draggable.component.css']
})
export class CytoscapeInformationDraggableComponent implements AfterViewInit {

  @ViewChild('draggableInformation')
  draggableInformation: ElementRef;

  @ViewChild('closeButton')
  closeButton: ElementRef;

  @Input()
  node: NodeDefinition;

  constructor(
    private graphBuilderSerivce: GraphBuilderService
  ) { }

  ngAfterViewInit(): void {
    this.dragElement(this.draggableInformation.nativeElement);
  }

  // w3schools draggable div
  dragElement(element: HTMLElement): void {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;



    const elementHeader = document.getElementById(element.id + 'Header');
    elementHeader.id = this.node.data.id + '-' + elementHeader.id;
    element.id = this.node.data.id + '-' + element.id;


    if (elementHeader) {
      /* if present, the header is where you move the DIV from:*/
      elementHeader.onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e): void {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e): void {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.top = (element.offsetTop - pos2) + 'px';
      element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement(): void {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  destroyComponent(): void {
    this.draggableInformation.nativeElement.parentElement
      .removeChild(this.draggableInformation.nativeElement);
    this.graphBuilderSerivce.removeFromOpenInformationContainerIds(
      this.draggableInformation.nativeElement.id
    );
  }


}
