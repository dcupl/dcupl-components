import { Component, Input } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import {
  Suggestion,
  ListMetadata,
  DcuplQueryGroup,
  DcuplQuery,
} from '@dcupl/common';

@Component({
  selector: 'app-suggestion-multiselect',
  templateUrl: './suggestion-multiselect.component.html',
  styleUrls: ['./suggestion-multiselect.component.scss'],
})
export class SuggestionMultiselectComponent {
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

  public isValueSelected(value: string) {
    return (
      this.getActiveQuery()?.queries.find(
        (q: DcuplQuery) => q.value === value
      ) !== undefined
    );
  }

  public removeQuery(value: string) {
    this.list?.catalog.query.remove({
      groupKey: 'baseColour',
      queries: [
        {
          attribute: 'baseColour',
          operator: 'eq',
          value: value,
        },
      ],
    });
  }

  public calculateSuggestions(value: string) {
    this.suggestions =
      this.list?.catalog.fn.suggest({
        attribute: 'baseColour',
        value: `/${value}/`,
        max: 10,
        transform: ['lowercase', 'removeWhitespace'],
        relevantData: 'all',
      }) || [];
  }

  public toggle(value: string) {
    if (this.isValueSelected(value)) {
      this.removeQuery(value);
    } else {
      this.applyQuery(value);
    }
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
          { mode: 'add' }
        );
      }
    }
  }
}
