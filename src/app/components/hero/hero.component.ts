import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  scrollToForm(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('consulta');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToServices(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
