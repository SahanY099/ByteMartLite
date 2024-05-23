import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/')({
  component: () => <div>Hello /dashboard/products/!</div>
})