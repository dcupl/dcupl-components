import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFacetsComponent } from './simple-facets.component';

describe('SimpleFacetsComponent', () => {
  let component: SimpleFacetsComponent;
  let fixture: ComponentFixture<SimpleFacetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleFacetsComponent]
    });
    fixture = TestBed.createComponent(SimpleFacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
