import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/new')({
  component: () => <div>Hello /dashboard/products/new!</div>
})