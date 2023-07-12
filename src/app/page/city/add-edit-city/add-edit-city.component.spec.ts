import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCityComponent } from './add-edit-city.component';

describe('AddEditCityComponent', () => {
  let component: AddEditCityComponent;
  let fixture: ComponentFixture<AddEditCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
