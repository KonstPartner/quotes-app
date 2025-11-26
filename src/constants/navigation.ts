export const NAV_LINKS: Array<{ to: string; label: string }> = [
  { to: '/', label: 'Home' },
  { to: '/quotes', label: 'Quotes' },
  { to: '/user-quotes', label: 'User Quotes' },
  { to: '/user-quotes/create', label: 'Create' },
  { to: '/chat', label: 'Chat' },
  { to: '/posts', label: 'Posts' },
] as const;
