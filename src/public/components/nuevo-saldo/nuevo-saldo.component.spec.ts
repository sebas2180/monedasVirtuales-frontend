import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSaldoComponent } from './nuevo-saldo.component';

describe('NuevoSaldoComponent', () => {
  let component: NuevoSaldoComponent;
  let fixture: ComponentFixture<NuevoSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
