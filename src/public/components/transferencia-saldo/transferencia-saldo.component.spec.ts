import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaSaldoComponent } from './transferencia-saldo.component';

describe('TransferenciaSaldoComponent', () => {
  let component: TransferenciaSaldoComponent;
  let fixture: ComponentFixture<TransferenciaSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
