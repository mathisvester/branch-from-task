import { ChangeDetectionStrategy, Component } from '@angular/core';
import { branchTypes } from '../shared/branch-types';

@Component({
  selector: 'app-branch-types',
  imports: [],
  templateUrl: './branch-types.component.html',
  styleUrl: './branch-types.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchTypesComponent {
  protected readonly branchTypes = Array.from(branchTypes);
}
