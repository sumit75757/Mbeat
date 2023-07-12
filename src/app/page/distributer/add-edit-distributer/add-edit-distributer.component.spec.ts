import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDistributerComponent } from './add-edit-distributer.component';

describe('AddEditDistributerComponent', () => {
  let component: AddEditDistributerComponent;
  let fixture: ComponentFixture<AddEditDistributerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDistributerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
