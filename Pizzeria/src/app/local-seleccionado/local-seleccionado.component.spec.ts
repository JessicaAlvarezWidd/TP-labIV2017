import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSeleccionadoComponent } from './local-seleccionado.component';

describe('LocalSeleccionadoComponent', () => {
  let component: LocalSeleccionadoComponent;
  let fixture: ComponentFixture<LocalSeleccionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalSeleccionadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
