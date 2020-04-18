import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasContratosComponent } from './estadisticas-contratos.component';

describe('EstadisticasContratosComponent', () => {
  let component: EstadisticasContratosComponent;
  let fixture: ComponentFixture<EstadisticasContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
