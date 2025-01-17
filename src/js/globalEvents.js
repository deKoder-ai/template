'use strict';
import { navBar } from './NavigationBar';

function clickEvents(e) {
  const target = e.target;
  switch (target.id) {
    case 'dropdown-btn':
      if (navBar.dropdownToggle === false) {
        navBar.openDropdownMenu();
      } else if (navBar.dropdownToggle === true) {
        navBar.closeDropdownMenu();
      }
      break;
    case 'nav-btn-1':
    case 'dropdown-item-1':
      console.log('Nav Link 1');
      break;
    case 'nav-btn-2':
    case 'dropdown-item-2':
      console.log('Nav Link 2');
      break;
    case 'nav-btn-3':
    case 'dropdown-item-3':
      console.log('Nav Link 3');
      break;
    case 'dropdown-item-4':
      console.log('Nav Link 4');
      break;
    default:
      if (navBar.dropdownToggle === true) {
        navBar.closeDropdownMenu();
      }
      break;
  }
}

function keydownEvents(e) {
  if (e.key === 'Escape') {
    if (navBar.dropdownToggle === true) {
      navBar.closeDropdownMenu();
    }
  }
}

export { clickEvents, keydownEvents };
