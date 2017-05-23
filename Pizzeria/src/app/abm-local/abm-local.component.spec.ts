import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmLocalComponent } from './abm-local.component';

describe('AbmLocalComponent', () => {
  let component: AbmLocalComponent;
  let fixture: ComponentFixture<AbmLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
