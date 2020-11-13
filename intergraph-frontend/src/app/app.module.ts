import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CytoscapeGraphComponent } from './cytoscape-graph/cytoscape-graph.component';
import { HttpClientModule } from '@angular/common/http';
import { CytoscapeOverlayComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-overlay.component';
import { CytoscapeSearchComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-search/cytoscape-search.component';
import { CytoscapeInformationComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-information/cytoscape-information.component';
import { CytoscapeConfigComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-config/cytoscape-config.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CytoscapeNodeDetailComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-node-detail/cytoscape-node-detail.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { CytoscapeInformationDraggableComponent } from './cytoscape-graph/cytoscape-overlay/cytoscape-information/cytoscape-information-draggable/cytoscape-information-draggable.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TruncPipe } from './trunc.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CytoscapeGraphComponent,
    CytoscapeOverlayComponent,
    CytoscapeSearchComponent,
    CytoscapeInformationComponent,
    CytoscapeConfigComponent,
    CytoscapeNodeDetailComponent,
    CytoscapeInformationDraggableComponent,
    TruncPipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatExpansionModule,
        MatTabsModule,
    ],
  providers: [ ],
  bootstrap: [AppComponent],
  entryComponents: [CytoscapeInformationComponent]
})
export class AppModule { }
