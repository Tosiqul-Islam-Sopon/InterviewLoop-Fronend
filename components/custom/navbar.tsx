"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { Menu } from "lucide-react";
import Image from "next/image";
import { rootPaths } from "@/lib/paths";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

export function Navbar() {
  const { data: session, status } = useSession();
  const logoutMutation = useLogout();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const initials = session?.user?.email?.slice(0, 2).toUpperCase();


  if (pathname === "/login") return null;
  return (
    <header className="border-b fixed top-0 z-50 w-full bg-linear-to-r from-background via-secondary/50 to-background backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.png" alt="InterviewLoop" height={180} width={180} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/interviews">Interviews</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/companies">Companies</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/submit">Share Experience</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          {status === "loading" ? null : !isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link href={rootPaths.login}>Login</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() =>
                    logoutMutation.mutate(undefined, {
                      onSuccess: () => router.push("/"),
                    })
                  }
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="space-y-4">
              <Link href="/interviews">Interviews</Link>
              <Link href="/companies">Companies</Link>
              <Link href="/submit">Share Experience</Link>
              {status !== "loading" &&
                (!isAuthenticated ? (
                  <Button className="w-full" asChild>
                    <Link href={rootPaths.login}>Login</Link>
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() =>
                      logoutMutation.mutate(undefined, {
                        onSuccess: () => router.push("/"),
                      })
                    }
                  >
                    Logout
                  </Button>
                ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
