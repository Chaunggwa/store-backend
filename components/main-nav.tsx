"use client";


import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "lucide-react";



export function MainNav ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        }
    ];
    return (
        <>
         <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button variant="outline" className="md:hidden ml-2">
            <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Manage Store</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            {routes.map((route) => (
            <DropdownMenuItem key={route.href} onClick={() => router.push(route.href) }>
                {/* <Link
                    key={route.href}
                    href={route.href}
                    className={cn("w-full text-sm font-medium transition-colors hover:text-primary", 
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                    >{route.label}</Link> */}{route.label}
            </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
       </DropdownMenuContent>
       </DropdownMenu>
        <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}>
            {
                routes.map((route) => {

                   return <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary", 
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                    >{route.label}</Link>
                })
            }
        </nav>
        </>
    )
}

