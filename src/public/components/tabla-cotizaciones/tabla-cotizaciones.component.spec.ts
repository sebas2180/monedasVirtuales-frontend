import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCotizacionesComponent } from './tabla-cotizaciones.component';

describe('TablaCotizacionesComponent', () => {
  let component: TablaCotizacionesComponent;
  let fixture: ComponentFixture<TablaCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
