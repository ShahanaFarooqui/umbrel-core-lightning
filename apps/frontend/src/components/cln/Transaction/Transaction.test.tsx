import { render, screen } from '@testing-library/react';
import Transaction from './Transaction';

describe('Transaction component ', () => {
  beforeEach(() => render(<Transaction />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
