import {AfterViewInit, Component, Input} from '@angular/core';
import {NodeDefinition} from 'cytoscape';

import {SettingsService} from '../../../services/settings/settings.service';

@Component({
  selector: 'app-cytoscape-node-detail',
  templateUrl: './cytoscape-node-detail.component.html',
  styleUrls: ['./cytoscape-node-detail.component.css']
})
export class CytoscapeNodeDetailComponent implements AfterViewInit {



  @Input()
  node: NodeDefinition;
  displayToken: string;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngAfterViewInit(): void {
    // this timeout handles the ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.displayToken = ""; // default
      for (var key of this.settingsService.getNodeClasses()) {
        if ((this.node.classes as string).includes(key)) {
          var x = this.node.data[this.settingsService.getSetting(key,'title')];
          if (x!==undefined) {
            let L = 60;
            if (x.length>L) x = x.substr(0,L-3)+"...";
            this.displayToken = x;
          }
        }
      }
    });

  }

}
