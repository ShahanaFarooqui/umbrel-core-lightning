import { render, screen } from '@testing-library/react';
import CLNDeposit from './CLNDeposit';

describe('CLNDeposit component ', () => {
  beforeEach(() => render(<CLNDeposit />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
