import { Component, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { branchTypes } from './branch-types';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly branchType = model<string | null>(null);
  protected readonly branchTypeOptions = Array.from(branchTypes.keys());
  protected readonly taskId = model<string>('');
  protected readonly taskName = model<string>('');
  protected readonly branchName = computed(() => {
    return `${this.branchType() ?? ''}/${this.taskId()}-${this.taskName().toLowerCase().replace(/\s+/g, '-')}`
  });
}
