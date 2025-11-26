import { render } from '@testing-library/react';

import { PaginationBar } from '@features/pagination/ui';

describe('PaginationBar', () => {
  it('renders component for middle page and match snapshot', () => {
    const { container } = render(
      <PaginationBar
        metadata={{ totalPages: 10, currentPage: 5 }}
        onPageChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders component for first page and match snapshot', () => {
    const { container } = render(
      <PaginationBar
        metadata={{ totalPages: 10, currentPage: 1 }}
        onPageChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
