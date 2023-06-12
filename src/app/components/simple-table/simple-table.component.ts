import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { ListMetadata } from '@dcupl/common';
import { Style } from '../../pages/components-overview/components-overview.component';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnInit {
  @Input() public list!: DcuplList;

  public data: Style[] = [];

  public metadata: ListMetadata | undefined;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    if (this.list) {
      this.list.catalog.query.applyOptions({
        count: 10,
        sort: { order: ['ASC'], attributes: ['year'] },
      });
      this.loadData();

      this.list.on((msg) => {
        if (msg.action === 'update') {
          this.loadData();
        }
      });
    }
  }

  public reset() {
    // Reset query - skip processing to avoid unnecessary updates
    this.list.catalog.query.reset({ skipProcessing: true });
    // Apply the count option so we don't have to render 44k items
    this.list.catalog.query.applyOptions({ count: 10 });
  }

  private loadData() {
    this.data = this.list.catalog.query.execute();
    this.metadata = this.list.catalog.fn.metadata();
    this.cdRef.detectChanges();

    // Log current state
    console.groupCollapsed('Simple Table Component');
    console.log(this.list.catalog.query.get());
    console.log(this.data);
    console.log(this.metadata);
    console.groupEnd();
  }

  private log() {}
}
