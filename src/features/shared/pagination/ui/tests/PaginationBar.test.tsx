import { render } from '@testing-library/react';

import { PaginationBar } from '@features/shared/pagination/ui';

describe('PaginationBar snapshot', () => {
  it('renders correctly for middle page', () => {
    const { container } = render(
      <PaginationBar
        metadata={{ totalPages: 10, currentPage: 5 }}
        onPageChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly for first page', () => {
    const { container } = render(
      <PaginationBar
        metadata={{ totalPages: 10, currentPage: 1 }}
        onPageChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
