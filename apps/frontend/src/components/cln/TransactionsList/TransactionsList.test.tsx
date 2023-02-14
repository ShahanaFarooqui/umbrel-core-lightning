import { render, screen } from '@testing-library/react';
import TransactionsList from './TransactionsList';

describe('TransactionsList component ', () => {
  beforeEach(() => render(<TransactionsList />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
