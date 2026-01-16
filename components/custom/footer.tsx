'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/login") return null;
  return (
    <footer className="border-t bg-linear-to-br from-secondary/30 via-background to-accent/10">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              InterviewLoop
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share real interview experiences and help others prepare better.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/interviews">Interviews</Link>
              </li>
              <li>
                <Link href="/companies">Companies</Link>
              </li>
              <li>
                <Link href="/submit">Share Experience</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/guidelines">Guidelines</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Connect
            </h3>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Github />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
                <Linkedin />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-500">
                <Twitter />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} InterviewLoop. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
