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
  const cases = [
    {
      branchType: 'feat',
      taskId: ' ABC123task ',
      taskName: ' Implement User Authentication ',
      expected: 'feat/ABC123task-implement-user-authentication',
    },
    {
      branchType: 'fix',
      taskId: 'FIX-456',
      taskName: 'Fix & Improve Display !',
      expected: 'fix/FIX-456-fix-improve-display',
    },
    {
      branchType: 'docs',
      taskId: 'DÖC-789äöü',
      taskName: 'Aktualisieren der Benutzerhandbücher für Söllingerstraße',
      expected:
        'docs/DOEC-789aeoeue-aktualisieren-der-benutzerhandbuecher-fuer-soellingerstrasse',
    },
    {
      branchType: 'refactor',
      taskId: 'REF-1010',
      taskName:
        'Refactor Core Logic - Handle Edge Cases, e.g., "null" values, and "empty" arrays with \'$\' and \'#\' symbols!',
      expected:
        'refactor/REF-1010-refactor-core-logic-handle-edge-cases-eg-null-values-and-empty-arrays-with-and-symbols',
    },
    {
      branchType: 'ci',
      taskId: ' FIX-456 ',
      expected: 'ci/FIX-456',
    },
    {
      branchType: 'fix',
      taskName: ' Fix layout for mobile iOS',
      expected: 'fix/fix-layout-for-mobile-ios',
    },
  ];

  cases.forEach(
    ({
      branchType,
      taskId,
      taskName,
      expected,
    }: {
      branchType: string;
      taskId?: string;
      taskName?: string;
      expected: string;
    }) => {
      it(`should generate a branch name of '${expected}'`, async () => {
        const { user } = await setup();

        expect(
          screen.getByRole('combobox', { name: /branch type/i }),
        ).toHaveValue('feat');

        await user.selectOptions(
          screen.getByRole('combobox', { name: /branch type/i }),
          branchType,
        );

        if (taskId) {
          await user.type(
            screen.getByRole('textbox', { name: /task id/i }),
            taskId,
          );
        }

        if (taskName) {
          await user.type(
            screen.getByRole('textbox', { name: /task name/i }),
            taskName,
          );
        }

        expect(
          screen.getByRole('textbox', { name: /branch name/i }),
        ).toHaveValue(expected);
      });
    },
  );
});
