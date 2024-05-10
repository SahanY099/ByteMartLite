import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_browse/account/addresses')({
  component: () => <div>Hello /account/addresses!</div>
})