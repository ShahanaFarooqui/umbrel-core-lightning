import { render, screen } from '@testing-library/react';
import OpenChannel from './OpenChannel';

describe('OpenChannel component ', () => {
  beforeEach(() => render(<OpenChannel />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
