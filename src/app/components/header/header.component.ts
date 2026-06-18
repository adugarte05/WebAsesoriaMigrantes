import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  menuOpen = false;

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
