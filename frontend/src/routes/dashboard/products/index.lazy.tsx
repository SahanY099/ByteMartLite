import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { ListFilter, PlusCircle } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserMenu } from "@/routes/_browse/-components/user-menu";
import { MobileNav } from "@/routes/dashboard/-components/mobile-nav";
import { ProductRow } from "@/routes/dashboard/products/-components/product-row";
import { TablePagination } from "@/routes/dashboard/products/-components/table-pagination";

import { productsQueryOptions } from "@/services/products";

export const Route = createLazyFileRoute("/dashboard/products/")({
  component: Products,
});

function Products() {
  const { page } = Route.useSearch();
  const { data } = useSuspenseQuery(productsQueryOptions(page));
  const products = data?.data;

  return (
    <div className="pd:4 flex flex-col gap-4">
      <header className="sticky top-0 z-30 flex h-14 flex-row items-center justify-between bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:pt-2.5 xl:pt-0">
        <div className="flex flex-row items-center gap-4 sm:hidden">
          <MobileNav />
          <Logo size="small" to="/dashboard" />
        </div>
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>

      <div className="mx-auto grid w-full gap-4 px-4">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="gap-1" asChild>
            <Link to="/dashboard/products/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Link>
          </Button>
        </div>

        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Sales
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <ProductRow
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    dateCreated={product.createdAt}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <TablePagination />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
