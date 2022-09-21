import { Component } from '@angular/core';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
 */
@Component({
  selector: 'app-main-breadcrumb',
  templateUrl: './main-breadcrumb.component.html'
})
export class MainBreadcrumbComponent {

  constructor() { }

  public back(): void {
    window.history.back();
  }
}
