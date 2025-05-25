import { NavbarComponent } from './navbar.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { render, screen } from '@testing-library/angular';

describe('NavbarComponent', () => {
  it(`should render the 'branch from task' title`, async () => {
    await render(NavbarComponent, {
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    expect(screen.getByText('branch from task')).toBeInTheDocument();
  });

  it('should render a link to GitHub respository', async () => {
    await render(NavbarComponent, {
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    expect(
      screen.getByRole('link', { name: 'GitHub repository' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/mathisvester/branch-from-task',
    );
  });
});
