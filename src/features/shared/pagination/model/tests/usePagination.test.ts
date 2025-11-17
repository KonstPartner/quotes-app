import { usePagination } from '@features/shared/pagination/model';

describe('usePagination', () => {
  it('returns empty array when totalPages <= 0', () => {
    expect(usePagination({ totalPages: 0, currentPage: 1 })).toEqual({
      pages: [],
    });
    expect(usePagination({ totalPages: -5, currentPage: 1 })).toEqual({
      pages: [],
    });
  });

  it('returns only first page when totalPages = 1', () => {
    expect(usePagination({ totalPages: 1, currentPage: 1 })).toEqual({
      pages: [1],
    });
  });

  it('returns full range when totalPages <= maxButtons', () => {
    expect(usePagination({ totalPages: 5, currentPage: 3 })).toEqual({
      pages: [1, 2, 3, 4, 5],
    });
  });

  it('centers pages around currentPage in the middle', () => {
    expect(usePagination({ totalPages: 10, currentPage: 5 })).toEqual({
      pages: [1, 4, 5, 6, 10],
    });
  });

  it('shifts window to the start when currentPage is near the beginning', () => {
    expect(usePagination({ totalPages: 10, currentPage: 1 })).toEqual({
      pages: [1, 2, 3, 4, 10],
    });
  });

  it('shifts window to the end when currentPage is near the last page', () => {
    expect(usePagination({ totalPages: 10, currentPage: 10 })).toEqual({
      pages: [1, 7, 8, 9, 10],
    });
  });
});
