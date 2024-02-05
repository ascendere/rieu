import { Component } from '@angular/core';
import { VisitCounterService } from '../../services/visit-counter.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']})
export class LandingComponent {
  visitCount: number = 4;

  constructor(private visitCounterService: VisitCounterService) {}

  ngOnInit(): void {
    // Obtener el contador de visitas del servicio
    this.visitCount = this.visitCounterService.getVisitCount();
  }

  // Método que se ejecutará cuando quieras incrementar las visitas
  incrementVisits(): void {
    this.visitCounterService.incrementVisitCount();
    // Actualizar el contador de visitas en la vista
    this.visitCount = this.visitCounterService.getVisitCount();
  }
}
