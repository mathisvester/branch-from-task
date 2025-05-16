import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { branchTypes } from './branch-types';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { BranchTypesComponent } from "./branch-types/branch-types.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, ClipboardModule, BranchTypesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly clipboard = inject(Clipboard);

  protected readonly branchType = model<string>('feat');
  protected readonly branchTypeOptions = Array.from(branchTypes.keys());
  protected readonly taskId = model<string>('');
  protected readonly taskName = model<string>('');
  protected readonly branchName = computed(() => {
    return `${this.branchType()}/${this.taskId()}-${this.taskName().toLowerCase().replace(/\s+/g, '-').replace(/:/g, '')}`
  });
  protected readonly showToast = signal(false);

  protected copyBranchName(): void {
    this.clipboard.copy(this.branchName());
    this.showToast.set(true);

    setTimeout(() => {
      this.showToast.set(false);
    }, 2000);
  }
}
