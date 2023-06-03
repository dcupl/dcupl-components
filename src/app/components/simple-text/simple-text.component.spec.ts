import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextComponent } from './simple-text.component';

describe('SimpleTextComponent', () => {
  let component: SimpleTextComponent;
  let fixture: ComponentFixture<SimpleTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleTextComponent]
    });
    fixture = TestBed.createComponent(SimpleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
