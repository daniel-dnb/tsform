import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Providers } from '@/components/Providers'

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
    </Providers>
  ),
})
