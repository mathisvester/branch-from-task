import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BranchFormComponent } from './branch-form.component';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

async function setup() {
  const user = userEvent.setup();

  await render(BranchFormComponent, {
    providers: [provideExperimentalZonelessChangeDetection()],
  });

  return { user };
}

describe('BranchFormComponent', () => {
  it('should generate a branch name by user input', async () => {
    const { user } = await setup();

    expect(screen.getByRole('combobox', { name: /branch type/i })).toHaveValue(
      'feat',
    );

    await user.selectOptions(
      screen.getByRole('combobox', { name: /branch type/i }),
      'fix',
    );
    await user.type(screen.getByRole('textbox', { name: /task id/i }), '1234');
    await user.type(
      screen.getByRole('textbox', { name: /task name/i }),
      'My task name',
    );

    expect(screen.getByRole('textbox', { name: /branch name/i })).toHaveValue(
      'fix/1234-my-task-name',
    );
  });
});
