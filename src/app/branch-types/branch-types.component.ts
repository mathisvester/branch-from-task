import { Component } from '@angular/core';
import { branchTypes } from '../branch-types';

@Component({
  selector: 'app-branch-types',
  imports: [],
  templateUrl: './branch-types.component.html',
  styleUrl: './branch-types.component.css'
})
export class BranchTypesComponent {
  protected readonly branchTypes = Array.from(branchTypes);
}
