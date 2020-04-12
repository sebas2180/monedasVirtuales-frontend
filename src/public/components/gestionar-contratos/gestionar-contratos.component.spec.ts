import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarContratosComponent } from './gestionar-contratos.component';

describe('GestionarContratosComponent', () => {
  let component: GestionarContratosComponent;
  let fixture: ComponentFixture<GestionarContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
