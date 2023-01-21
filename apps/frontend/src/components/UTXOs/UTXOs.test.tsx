import { render, screen } from '@testing-library/react';
import UTXOs from './UTXOs';

describe('UTXOs component ', () => {
  beforeEach(() => render(<UTXOs />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
