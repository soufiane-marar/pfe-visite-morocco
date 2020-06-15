import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauDialogComponent } from './restau-dialog.component';

describe('RestauDialogComponent', () => {
  let component: RestauDialogComponent;
  let fixture: ComponentFixture<RestauDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
