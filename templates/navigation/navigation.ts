// mega-menu.component.ts
import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent {
  isMenuOpen = false;
  currentFocusIndex = -1;

  @ViewChild('menuPanel') menuPanel!: ElementRef;
  @ViewChild('trigger') trigger!: ElementRef;

  menuSections = [
    {
      title: 'Products',
      items: [
        { text: 'All Products', icon: 'apps', link: '/products' },
        { text: 'New Arrivals', icon: 'new_releases', link: '/new' }
      ]
    },
    {
      title: 'Support',
      items: [
        { text: 'Documentation', icon: 'description', link: '/docs' },
        { text: 'Contact Us', icon: 'support', link: '/contact' }
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      setTimeout(() => this.focusFirstItem(), 0);
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.trigger.nativeElement.focus();
  }

  private focusFirstItem() {
    const firstItem = this.menuPanel.nativeElement.querySelector('[role="menuitem"]');
    if (firstItem) {
      firstItem.focus();
      this.currentFocusIndex = 0;
    }
  }

  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    this.moveFocus(1);
  }

  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    this.moveFocus(-1);
  }

  private moveFocus(step: number) {
    const items = this.menuPanel.nativeElement.querySelectorAll('[role="menuitem"]');
    this.currentFocusIndex = (this.currentFocusIndex + step + items.length) % items.length;
    items[this.currentFocusIndex].focus();
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}