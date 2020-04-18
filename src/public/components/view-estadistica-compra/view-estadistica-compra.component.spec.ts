import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstadisticaCompraComponent } from './view-estadistica-compra.component';

describe('ViewEstadisticaCompraComponent', () => {
  let component: ViewEstadisticaCompraComponent;
  let fixture: ComponentFixture<ViewEstadisticaCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEstadisticaCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstadisticaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
