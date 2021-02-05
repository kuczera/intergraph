import { Component, OnInit } from '@angular/core';
import {GraphBuilderService} from '../../services/graphbuilder/graph-builder.service';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {SettingsService} from '../../../services/settings/settings.service';
import { PwdDialogComponent } from './pwd-dialog/pwd-dialog.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cytoscape-config',
  templateUrl: './cytoscape-config.component.html',
  styleUrls: ['./cytoscape-config.component.css']
})
export class CytoscapeConfigComponent implements OnInit {

  labelcount: any;
  settings: any;
  colorTmp: any;
//  githubcolors:  Array<string>; // ***************** ??
  keyList: Map<string,string[]>;
  saveDisabled: boolean;
  secret: string = "1234";

  constructor(private graphBuilderService: GraphBuilderService,
              private elementDataService: ElementDataService,
              private settingsService: SettingsService,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.saveDisabled = true;
    this.colorTmp = {};
    this.keyList = new Map;

    this.settingsService.getSettings().subscribe(data => {
      this.settings = data;
      this.elementDataService.getDatabaseLabelCount().subscribe((data) => {
        this.labelcount = data;
        for (let l of this.labelcount) {
          this.elementDataService.getKeys(l.name).subscribe((data) => {
              var k = new Array();
              k.push("");
              data.sort((a, b) => (a.name > b.name ? 1 : -1));
              for (let d of data) k.push(d.name);
            this.keyList.set(l.name, k);
            })
          this.colorTmp[l.name] = this.settings[l.name + "-color"] === undefined ? "#ffffff" : this.settings[l.name + "-color"];
        }
        this.labelcount.sort((a, b) => (a.count < b.count ? 1 : -1));
      });
    });
  }

  save()
  {
    const dialogRef = this.dialog.open(PwdDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(password => {
      const isPwdValid = password === this.secret;
      console.log(isPwdValid);
      if (isPwdValid) {
        this.saveDisabled = true;
        this.settingsService.saveSettings(this.settings).subscribe();
      } else {
        // run code for wrong password
      }
    });
  }
}
