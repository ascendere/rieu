import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisitCounterService {
  private visitCount: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    }
  }

  getVisitCount(): number {
    return this.visitCount;
  }

  incrementVisitCount(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visitCount++;
      localStorage.setItem('visitCount', this.visitCount.toString());
    }
  }
}
