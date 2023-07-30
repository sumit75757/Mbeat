import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistCityComponent } from './dist-city.component';

describe('DistCityComponent', () => {
  let component: DistCityComponent;
  let fixture: ComponentFixture<DistCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
