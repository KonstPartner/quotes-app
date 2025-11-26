import { RefObject } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import type { Post } from '@features/posts/model';
import { PostsContainer } from '@features/posts/ui';

const mockUsePostsPage = jest.fn();
const mockUseScrollIntoView = jest.fn();

jest.mock('@features/posts/api', () => ({
  usePostsPage: (...args: unknown[]) => mockUsePostsPage(...args),
}));

jest.mock('@hooks', () => ({
  useScrollIntoView: (...args: unknown[]) => mockUseScrollIntoView(...args),
}));

type PostsSectionProps = {
  posts: Post[];
  listRef: RefObject<HTMLDivElement>;
  metadata: { currentPage: number; totalPages: number };
  handleScroll: (page: number) => void;
};

const mockPostsSection = jest.fn((_props: PostsSectionProps) => (
  <div data-testid="posts-section" />
));

jest.mock('@entities/posts', () => ({
  PostsSection: (props: PostsSectionProps) => mockPostsSection(props),
}));

jest.mock('@entities/shared', () => ({
  Loading: () => <div>Loading…</div>,
  ErrorSection: ({ callback }: { callback: () => void }) => (
    <button onClick={callback}>Retry</button>
  ),
}));

describe('PostsContainer', () => {
  const { getByText, queryByTestId } = screen;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loading when loading is true', () => {
    mockUsePostsPage.mockReturnValue({
      posts: [],
      totalPages: 1,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    mockUseScrollIntoView.mockReturnValue({
      ref: { current: null } as unknown as RefObject<HTMLDivElement>,
      handleScroll: jest.fn(),
    });

    render(<PostsContainer />);

    expect(getByText(/loading…/i)).toBeInTheDocument();
    expect(queryByTestId('posts-section')).not.toBeInTheDocument();
  });

  it('renders ErrorSection when error is present and refetch is called on Retry', () => {
    const refetchMock = jest.fn();

    mockUsePostsPage.mockReturnValue({
      posts: [],
      totalPages: 1,
      loading: false,
      error: new Error('Network error'),
      refetch: refetchMock,
    });

    mockUseScrollIntoView.mockReturnValue({
      ref: { current: null } as unknown as RefObject<HTMLDivElement>,
      handleScroll: jest.fn(),
    });

    render(<PostsContainer />);

    const retryButton = getByText(/retry/i);
    fireEvent.click(retryButton);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('renders PostsSection with correct props when data is loaded', () => {
    const posts: Post[] = [
      { id: '1', title: 'Post 1', body: 'Body 1' },
      { id: '2', title: 'Post 2', body: 'Body 2' },
    ];
    const handleScrollMock = jest.fn();
    const refMock = { current: null } as unknown as RefObject<HTMLDivElement>;

    mockUsePostsPage.mockReturnValue({
      posts,
      totalPages: 5,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    mockUseScrollIntoView.mockReturnValue({
      ref: refMock,
      handleScroll: handleScrollMock,
    });

    render(<PostsContainer />);

    expect(mockPostsSection).toHaveBeenCalledTimes(1);

    const props = mockPostsSection.mock.calls[0][0] as PostsSectionProps;

    expect(props.posts).toEqual(posts);
    expect(props.listRef).toBe(refMock);
    expect(props.metadata).toEqual({ currentPage: 1, totalPages: 5 });

    props.handleScroll(3);
    expect(handleScrollMock).toHaveBeenCalledWith(3);
  });
});
