import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMonederoComponent } from './gestionar-monedero.component';

describe('GestionarMonederoComponent', () => {
  let component: GestionarMonederoComponent;
  let fixture: ComponentFixture<GestionarMonederoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarMonederoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMonederoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
