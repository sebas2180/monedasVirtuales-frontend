import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCotizacionesComponent } from './gestionar-cotizaciones.component';

describe('GestionarCotizacionesComponent', () => {
  let component: GestionarCotizacionesComponent;
  let fixture: ComponentFixture<GestionarCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
