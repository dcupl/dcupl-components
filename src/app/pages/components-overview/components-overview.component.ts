import { Component, OnInit } from '@angular/core';
import { Dcupl, DcuplList } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';

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

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    const dcupl = new Dcupl({ config: { projectId: 'amNlybMblzqF2qcixBVT' } });

    // create your loader, add the loader to your core and fetch the config
    const loader = new DcuplAppLoader();

    dcupl.loaders.add(loader);

    await loader.config.fetch();

    await loader.process({
      applicationKey: 'default',
    });

    // dcupl.on((msg) => console.log(msg));

    await dcupl.init();

    /**
     * There is a model called "Styles" available containing 44k items
     * with the properties: gender | masterCategory | subCategory | articleType | baseColour | season | year | productDisplayName
     */

    this.stylesList = dcupl.lists.create({ modelKey: 'Style' });
  }
}
