import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRetailerComponent } from './add-edit-retailer.component';

describe('AddEditRetailerComponent', () => {
  let component: AddEditRetailerComponent;
  let fixture: ComponentFixture<AddEditRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRetailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
