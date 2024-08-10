import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/loading-button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserMenu } from "@/components/user-menu";
import { MobileNav } from "@/routes/~dashboard/components/mobile-nav";
import { ProductImageUploader } from "../components/product-image-uploader";

import { queryClient } from "@/lib/query-client";
import { ProductCreateData, productCreateSchema } from "../schemas";
import { useCategories } from "../services";
import { useCreateProduct } from "../~new/services";
import { productQueryOptions } from "./services";

export const Route = createFileRoute("/dashboard/products/$productId/edit")({
  component: UpdateProduct,
  loader: async ({ params }) => {
    queryClient.ensureQueryData(productQueryOptions(params.productId));
  },
});

export function UpdateProduct() {
  const navigate = useNavigate({ from: "/account/addresses/new" });

  const { data: categories } = useCategories();

  const { mutateAsync, isPending, status } = useCreateProduct();

  const form = useForm<ProductCreateData>({
    resolver: zodResolver(productCreateSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: undefined,
    },
  });

  useEffect(() => {
    if (status == "success")
      navigate({ to: "/dashboard/products", search: { page: 1 } });
  }, [status, navigate]);

  const onSubmit = async (data: ProductCreateData) => {
    await mutateAsync(data);
  };

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
              <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink to="/dashboard/products" search={{ page: 1 }}>
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[59rem] gap-4">
        <div className="flex flex-1 flex-row items-center gap-4 px-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link to="/dashboard/products" search={{ page: 1 }}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0 sm:text-xl">
            New Product
          </h1>
          <Badge variant="outline">In stock</Badge>
          <div className="flex items-center gap-2 sm:ml-auto">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/products" search={{ page: 1 }}>
                Discard
              </Link>
            </Button>
            {/* <Button size="sm" className="hidden sm:block">
              Save
            </Button> */}
          </div>
        </div>

        <Form {...form}>
          <form
            className="grid gap-4 px-4 md:grid-cols-[1fr_250px] lg:gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              {/* product details */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Please fill in basic details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Gamer Gear Pro Controller"
                            />
                            <FormDescription>
                              The name of the product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...field} className="min-h-32" />
                            <FormDescription>
                              A short description of the product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <Input {...field} type="number" />
                            <FormDescription>
                              No. of items you are going to sell
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <Input {...field} type="number" />
                            <FormDescription>Price per unit</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* product images */}
              <ProductImageUploader />
            </div>

            <div className="grid auto-rows-max sm:col-span-2 md:col-span-1">
              <div className="grid gap-4 lg:gap-8">
                {/* product status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* product category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(parseInt(e));
                                }}
                                defaultValue={
                                  field.value != undefined
                                    ? field.value.toString()
                                    : ""
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories?.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id.toString()}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* archive product */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>

                <LoadingButton loading={isPending} type="submit">
                  Save
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
