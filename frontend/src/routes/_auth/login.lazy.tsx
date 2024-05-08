import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/login')({
  component: () => <div>Hello /_auth/login!</div>
})