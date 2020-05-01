import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCotizacionesComponent } from './ver-cotizaciones.component';

describe('VerCotizacionesComponent', () => {
  let component: VerCotizacionesComponent;
  let fixture: ComponentFixture<VerCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
