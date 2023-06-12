import { Component, Input } from '@angular/core';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent {
  @Input() public list: DcuplList | undefined;

  public activeYear: number | undefined;

  public applyQuery(queryValue: string | number) {

    this.activeYear = parseInt(queryValue as string, 10);

    if (!queryValue) {
      this.list?.catalog.query.remove({ groupKey: 'productDisplayName' });
    } else {
      if (this.list) {
        this.list.catalog.query.apply(
          {
            attribute: 'year',
            operator: 'gt',
            value: queryValue,
          },
          { mode: 'set' }
        );
      }
    }
  }
}
