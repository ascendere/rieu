import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-sidenav',
  templateUrl: './landing-sidenav.component.html',
  styleUrls: ['./landing-sidenav.component.css'],
})
export class LandingSidenavComponent {
  mobileMenuVisible: boolean = false;
  lastScrollTop: number = 0;

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (window.innerWidth <= 1040) {
        // Pantallas pequeñas: Ocultar el navbar al hacer scroll hacia abajo
        if (scrollTop > this.lastScrollTop) {
          header.classList.add('hide-navbar');
          header.classList.remove('show-navbar');
        } else {
          header.classList.add('show-navbar');
          header.classList.remove('hide-navbar');
        }
      } else {
        // Pantallas grandes: Mostrar el navbar al hacer scroll hacia arriba y hacia abajo
        header.classList.add('show-navbar');
        header.classList.remove('hide-navbar');
      }
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }
}
