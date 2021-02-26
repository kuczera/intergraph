import {Component} from '@angular/core';
import {SettingsService} from './services/settings/settings.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  appVisible: boolean;

  constructor(
    private settingsService: SettingsService
  ) {
    this.appVisible = false;
    // load and cache settings
    this.settingsService.loadSettings().subscribe(settings =>
      {
        this.settingsService.cacheSettings(settings);
        this.appVisible = true;
      }
    )
  }
}
