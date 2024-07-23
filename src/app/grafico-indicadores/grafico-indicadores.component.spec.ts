import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoIndicadoresComponent } from './grafico-indicadores.component';

describe('GraficoIndicadoresComponent', () => {
  let component: GraficoIndicadoresComponent;
  let fixture: ComponentFixture<GraficoIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoIndicadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
