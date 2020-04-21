import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosProveedoresComponent } from './logos-proveedores.component';

describe('LogosProveedoresComponent', () => {
  let component: LogosProveedoresComponent;
  let fixture: ComponentFixture<LogosProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogosProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogosProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
