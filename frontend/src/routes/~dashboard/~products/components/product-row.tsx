import { Link } from "@tanstack/react-router";
import { MoreHorizontal, Pen, Trash } from "lucide-react";

import placeholderImg from "@/assets/placeholder.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

type ProductRowProps = {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
  dateCreated: string;
};

export const ProductRow = ({
  id,
  name,
  price,
  imageUrl,
  dateCreated,
}: ProductRowProps) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imageUrl || placeholderImg}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <Badge variant="outline">Draft</Badge>
      </TableCell>
      <TableCell>$ {price}</TableCell>
      <TableCell className="hidden md:table-cell">25</TableCell>
      <TableCell className="hidden md:table-cell">{dateCreated}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                preload="intent"
                to="/dashboard/products/$productId/edit"
                params={{ productId: id.toString() }}
              >
                Edit <Pen className="ml-auto h-4 w-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete <Trash className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export const ProductRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className="h-16 w-16 animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 w-8 animate-pulse rounded bg-secondary"></div>
      </TableCell>
    </TableRow>
  );
};
