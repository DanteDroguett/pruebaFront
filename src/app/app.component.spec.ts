import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule // Importa módulos necesarios para el testing
      ],
      declarations: [
        // No es necesario incluir AppComponent aquí ya que es standalone
      ],
    }).compileComponents();
  });





});
