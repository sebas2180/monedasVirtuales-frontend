import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCompraComponent } from './estadisticas-compra.component';

describe('EstadisticasCompraComponent', () => {
  let component: EstadisticasCompraComponent;
  let fixture: ComponentFixture<EstadisticasCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
