import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortFilterLabelBy'
})
export class SortFilterLabelByPipe implements PipeTransform {

  transform(tab: any[]): any[] {
    if (tab != undefined) {

      tab.sort(sortFilterLabel);


      function sortFilterLabel(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      };

      return tab;
    }
    return tab;

  }

}
