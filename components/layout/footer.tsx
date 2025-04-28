import Link from "next/link";
import { Facebook, Instagram, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-muted/20 text-primary-foreground dark:text-muted-foreground py-10 mt-auto border-t border-primary-foreground/20 dark:border-muted-foreground/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Baiyit</h3>
            <p className="text-primary-foreground/80 dark:text-muted-foreground/80">
              The world&apos;s first AI-first shopping concierge that finds,
              compares, and purchases exactly what you need.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/concierge"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Concierge
                </Link>
              </li>
              <li>
                <Link
                  href="/showroom"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Showroom
                </Link>
              </li>
              <li>
                <Link
                  href="/hub"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 dark:text-muted-foreground/80 hover:text-primary-foreground dark:hover:text-muted-foreground"
              >
                <X />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 dark:border-muted-foreground/20 text-center text-primary-foreground/70 dark:text-muted-foreground/70">
          <p>© {new Date().getFullYear()} Baiyit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
