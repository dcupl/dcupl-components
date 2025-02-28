import { Component, OnInit } from '@angular/core';
import { ListMetadata } from '@dcupl/common';
import { Dcupl, DcuplList } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';
import { DcuplConnect } from '@dcupl/connect';

export type Style = {
  key: string;
  gender: string;
  masterCategory: string;
  subCategory: string;
  articleType: string;
  baseColour: string;
  season: string;
  year: string;
  productDisplayName: string;
};

@Component({
  selector: 'app-components-overview',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss'],
})
export class ComponentsOverviewComponent implements OnInit {
  public stylesList!: DcuplList;
  public metadata: ListMetadata | undefined;

  public viewMode: 'component' | 'code' = 'component';

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    console.time('init dcupl');
    const dcupl = new Dcupl({ config: { projectId: 'amNlybMblzqF2qcixBVT' } });

    const connectClient = new DcuplConnect({
      dcuplInstance: dcupl,
    });

    await connectClient.init();

    // create your loader, add the loader to your core and fetch the config
    const loader = new DcuplAppLoader();

    dcupl.loaders.add(loader);

    await loader.config.fetch();

    await loader.process({
      applicationKey: 'default',
    });

    // dcupl.on((msg) => console.log(msg));

    await dcupl.init();
    console.timeEnd('init dcupl');

    /**
     * There is a model called "Styles" available containing 44k items
     * with the properties: gender | masterCategory | subCategory | articleType | baseColour | season | year | productDisplayName
     */

    this.stylesList = dcupl.lists.create({ modelKey: 'Style' });

    this.metadata = this.stylesList.catalog.fn.metadata();

    this.stylesList.on((msg) => {
      if (msg.action === 'update') {
        this.metadata = this.stylesList.catalog.fn.metadata();
      }
    });
  }

  public reset() {
    // Reset query - skip processing to avoid unnecessary updates
    this.stylesList.catalog.query.reset({ skipProcessing: true });
    // Apply the count option so we don't have to render 44k items
    this.stylesList.catalog.query.applyOptions({ count: 10 });
  }

  public toggleView() {
    if (this.viewMode === 'component') {
      this.viewMode = 'code';
    } else {
      this.viewMode = 'component';
    }
  }
}
