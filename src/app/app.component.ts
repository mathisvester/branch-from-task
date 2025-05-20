import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [BranchFormComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
