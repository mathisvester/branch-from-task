import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed, tick } from '@angular/core/testing';
import { BranchFormComponent } from './branch-form.component';
import { By } from '@angular/platform-browser';

describe('BranchFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchFormComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BranchFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should generate a branch name by user input', async () => {
    const fixture = TestBed.createComponent(BranchFormComponent);
    await fixture.whenStable();

    const branchTypeSelectDe = fixture.debugElement.query(
      By.css('#branchType'),
    );
    const inputTaskIdDe = fixture.debugElement.query(By.css('#taskId'));
    const inputTaskNameDe = fixture.debugElement.query(By.css('#taskName'));
    const inputBranchNameDe = fixture.debugElement.query(By.css('#branchName'));

    const branchTypeSelect: HTMLSelectElement =
      branchTypeSelectDe.nativeElement;
    const inputTaskId: HTMLInputElement = inputTaskIdDe.nativeElement;
    const inputTaskName: HTMLInputElement = inputTaskNameDe.nativeElement;
    const inputBranchName: HTMLInputElement = inputBranchNameDe.nativeElement;

    expect(branchTypeSelect).toBeTruthy();
    expect(inputTaskId).toBeTruthy();
    expect(inputTaskName).toBeTruthy();
    expect(inputBranchName).toBeTruthy();

    branchTypeSelect.value = 'fix';
    branchTypeSelect.dispatchEvent(new Event('change'));

    inputTaskId.value = '1234';
    inputTaskId.dispatchEvent(new Event('input'));

    inputTaskName.value = 'My task name';
    inputTaskName.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(inputBranchName.value).toEqual('fix/1234-my-task-name');
  });
});
