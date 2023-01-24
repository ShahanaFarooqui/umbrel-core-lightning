import { render, screen } from '@testing-library/react';
import Transactions from './Transactions';

describe('Transactions component ', () => {
  beforeEach(() => render(<Transactions />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
