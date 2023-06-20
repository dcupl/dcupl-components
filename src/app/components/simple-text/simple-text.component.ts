import { Component, Input } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { escapeRegExp } from '@dcupl/common';

@Component({
  selector: 'app-simple-text',
  templateUrl: './simple-text.component.html',
  styleUrls: ['./simple-text.component.scss'],
})
export class SimpleTextComponent {
  @Input() public list: DcuplList | undefined;

  public applyQuery(queryValue: string) {
    if (!queryValue) {
      this.list?.catalog.query.remove({ groupKey: 'productDisplayName' });
    } else {
      const escapedQueryValue = escapeRegExp(queryValue.toLowerCase());

      if (this.list) {
        this.list.catalog.query.apply(
          {
            attribute: 'productDisplayName',
            operator: 'find',
            value: `/${escapedQueryValue}/`,
            options: {
              transform: ['lowercase']
            }
          },
          { mode: 'set' }
        );
      }
    }
  }
}
