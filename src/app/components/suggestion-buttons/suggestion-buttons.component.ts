import { Component, Input } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { Suggestion, ListMetadata, DcuplQueryGroup } from '@dcupl/common';

@Component({
  selector: 'app-suggestion-buttons',
  templateUrl: './suggestion-buttons.component.html',
  styleUrls: ['./suggestion-buttons.component.scss'],
})
export class SuggestionButtonsComponent {
  @Input() public list: DcuplList | undefined;

  public suggestions: Suggestion[] = [];
  public meta: ListMetadata | undefined;

  ngOnInit() {
    this.calculateSuggestions('');
    this.loadData();

    this.list?.on((msg) => {
      if (msg.action === 'update') {
        this.loadData();
      }
    });
  }

  private loadData() {
    this.meta = this.list?.catalog.fn.metadata();
  }

  public getActiveQuery() {
    return this.meta?.appliedQuery.queries.find(
      (qGroup) => qGroup.groupKey === 'baseColour'
    );
  }

  public removeQueryGroup(queryGroup: DcuplQueryGroup) {
    this.list?.catalog.query.remove(queryGroup);
  }

  public calculateSuggestions(value: string) {
    this.suggestions =
      this.list?.catalog.fn.suggest({
        attribute: 'baseColour',
        value: `/${value}/`,
        max: 10,
        transform: ['lowercase', 'removeWhitespace'],
      }) || [];
  }

  public applyQuery(queryValue: string) {
    if (!queryValue) {
      this.list?.catalog.query.remove({ groupKey: 'productDisplayName' });
    } else {
      // const escapedQueryValue = escapeRegExp(queryValue);
      if (this.list) {
        this.list.catalog.query.apply(
          {
            attribute: 'baseColour',
            operator: 'eq',
            value: queryValue,
          },
          { mode: 'set' }
        );
      }
    }
  }
}
