import { render, screen } from '@testing-library/react';
import CLNWithdraw from './CLNWithdraw';

describe('CLNWithdraw component ', () => {
  beforeEach(() => render(<CLNWithdraw />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
