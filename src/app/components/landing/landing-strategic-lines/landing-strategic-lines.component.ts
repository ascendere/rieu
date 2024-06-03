import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-strategic-lines',
  templateUrl: './landing-strategic-lines.component.html',
  styleUrl: './landing-strategic-lines.component.css',
})
export class LandingStrategicLinesComponent {
  lineas = [
    {
      titulo: 'Formación en Valores Éticos y Morales',
      descripcion: 'Descripción de Formación en Valores Éticos y Morales.',
      expanded: false,
    },
    {
      titulo: 'Responsabilidad Socioambiental Universitaria',
      descripcion:
        'Descripción de Responsabilidad Socioambiental Universitaria.',
      expanded: false,
    },
    {
      titulo: 'Lectoescritura',
      descripcion: 'Descripción de Lectoescritura.',
      expanded: false,
    },
    {
      titulo: 'Emprendimiento Educativo',
      descripcion: 'Descripción de Emprendimiento Educativo.',
      expanded: false,
    },
    {
      titulo: 'Transformación Digital',
      descripcion: 'Descripción de Transformación Digital.',
      expanded: false,
    },
  ];

  toggleContent(linea: any) {
    linea.expanded = !linea.expanded;
  }
}
