import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CompCanDeactivate } from './comp-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<CompCanDeactivate> {
  canDeactivate(component: CompCanDeactivate): boolean {
    if (component.canDeactivate()) {
      return true;
    } else {
      return confirm("You have unsaved changes! If you leave, your changes will be lost.");
    }
  }

}
