import { Component, Input, OnInit } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { FilterItemEntry } from '@dcupl/common';

@Component({
  selector: 'app-simple-facets',
  templateUrl: './simple-facets.component.html',
  styleUrls: ['./simple-facets.component.scss'],
})
export class SimpleFacetsComponent implements OnInit {
  @Input() public list: DcuplList | undefined;

  public items: FilterItemEntry[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init() {
    if (this.list) {
      this.loadFacets();

      this.list.on((msg) => {
        if (msg.action === 'update') {
          this.loadFacets();
        }
      });
    }
  }

  private loadFacets() {
    if (this.list) {
      console.time('facets');
      this.items = this.list.catalog.fn.facets({ attribute: 'articleType' });
      console.timeEnd('facets');
    }
  }

  public toggle(item: FilterItemEntry) {
    if (item.selected) {
      this.list!.catalog.query.remove({
        attribute: 'articleType',
        operator: 'eq',
        value: item.value,
      });
    } else {
      this.list!.catalog.query.apply(
        {
          attribute: 'articleType',
          operator: 'eq',
          value: item.value,
        },
        { mode: 'add' }
      );
    }
  }
}
