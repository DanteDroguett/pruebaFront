import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaIndicadoresComponent } from './lista-indicadores.component';
import { IndicadoresService, Indicador } from '../indicadores.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListaIndicadoresComponent', () => {
  let component: ListaIndicadoresComponent;
  let fixture: ComponentFixture<ListaIndicadoresComponent>;
  let mockIndicadoresService: jasmine.SpyObj<IndicadoresService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('IndicadoresService', ['getIndicators']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule], // Importa módulos necesarios
      declarations: [ListaIndicadoresComponent],
      providers: [
        { provide: IndicadoresService, useValue: spy }
      ]
    }).compileComponents();

    mockIndicadoresService = TestBed.inject(IndicadoresService) as jasmine.SpyObj<IndicadoresService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIndicadoresComponent);
    component = fixture.componentInstance;

    // Mock de datos con todas las propiedades requeridas por la interfaz Indicador
    mockIndicadoresService.getIndicators.and.returnValue(of([
      { id: 1, name: 'Dólar', value: 1.0, fecha: '' },
      { id: 2, name: 'Euro', value: 0.9, fecha: '' }
    ])); 

    fixture.detectChanges(); // Llama a detectChanges para actualizar la vista
  });




});
