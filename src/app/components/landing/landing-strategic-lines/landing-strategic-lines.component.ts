import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-strategic-lines',
  templateUrl: './landing-strategic-lines.component.html',
  styleUrl: './landing-strategic-lines.component.css'
})
export class LandingStrategicLinesComponent {
  mostrarTarjetas = false;

  toggleTarjetas() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }
  
}
