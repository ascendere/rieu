import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisitCounterService {
  private visitCount: number = 16;

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedCount = localStorage.getItem('visitCount');

      if (storedCount) {
        this.visitCount = parseInt(storedCount, 10);
      }
    }
  }

  getVisitCount(): number {
    return this.visitCount;
  }

  incrementVisitCount(): void {
    if (typeof localStorage !== 'undefined') {
      this.visitCount++;
      localStorage.setItem('visitCount', this.visitCount.toString());
    }
  }
}
