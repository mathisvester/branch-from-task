import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { branchTypes } from '../shared/branch-types';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { ModalComponent } from '../shared/modal/modal.component';
import { BranchTypesComponent } from '../branch-types/branch-types.component';

@Component({
  selector: 'app-branch-form',
  imports: [
    FormsModule,
    ClipboardModule,
    ToastComponent,
    ModalComponent,
    BranchTypesComponent,
  ],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css',
  host: {
    class: 'w-full',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchFormComponent {
  private readonly clipboard = inject(Clipboard);
  protected readonly branchType = model<string>('feat');
  protected readonly branchTypeOptions = Array.from(branchTypes.keys());
  protected readonly taskId = model<string>('');
  protected readonly taskName = model<string>('');
  protected readonly branchName = computed(() => {
    const taskId = this.taskId();
    const taskName = this.taskName();

    if (!taskId.length && !taskName.length) {
      return '';
    }

    let branchName = `${this.branchType()}/`;

    if (taskId.length > 0) {
      branchName += taskId;
    }

    if (taskId.length > 0 && taskName.length > 0) {
      branchName += '-';
    }

    if (taskName.length > 0) {
      branchName += taskName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/:/g, '');
    }

    return branchName;
  });

  protected readonly isToastVisible = signal(false);

  protected copyBranchName(): void {
    this.clipboard.copy(this.branchName());
    this.isToastVisible.set(true);

    setTimeout(() => {
      this.isToastVisible.set(false);
    }, 2000);
  }
}
