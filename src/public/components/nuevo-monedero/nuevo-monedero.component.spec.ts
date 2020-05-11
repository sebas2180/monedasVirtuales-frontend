import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMonederoComponent } from './nuevo-monedero.component';

describe('NuevoMonederoComponent', () => {
  let component: NuevoMonederoComponent;
  let fixture: ComponentFixture<NuevoMonederoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMonederoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMonederoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
