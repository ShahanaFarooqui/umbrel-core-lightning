import { render, screen } from '@testing-library/react';
import InfoBox from './InfoBox';

describe('InfoBox component ', () => {
  beforeEach(() => render(<InfoBox />));

  it('should be in the document', () => {
    // expect(screen.getByTestId('header-context')).toBeInTheDocument();
  });

});
