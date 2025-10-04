import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Fresh Flowers", href: "/products?type=FRESH_FLOWERS" },
      { name: "Dried Flowers", href: "/products?type=DRIED_FLOWERS" },
      { name: "Artificial Flowers", href: "/products?type=ARTIFICIAL_FLOWERS" },
      { name: "Décor Items", href: "/products?type=DECOR_ITEMS" },
      { name: "Event Packages", href: "/products?type=EVENT_PACKAGES" },
      { name: "Custom Bouquets", href: "/products?type=CUSTOM_BOUQUETS" },
    ],
    occasions: [
      { name: "Birthday", href: "/products?occasion=Birthday" },
      { name: "Anniversary", href: "/products?occasion=Anniversary" },
      { name: "Wedding", href: "/products?occasion=Wedding" },
      { name: "Valentine's Day", href: "/products?occasion=Valentine's Day" },
      { name: "Mother's Day", href: "/products?occasion=Mother's Day" },
      { name: "Graduation", href: "/products?occasion=Graduation" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Track Order", href: "/track-order" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Contact Us", href: "/contact" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Become a Partner", href: "/partner-signup" },
      { name: "Blog", href: "/blog" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-bold text-primary">BloomCart</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your one-stop destination for fresh flowers, beautiful décor, and memorable events. 
              Bringing nature's beauty to your doorstep.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://facebook.com/bloomcart">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://instagram.com/bloomcart">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://twitter.com/bloomcart">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h3 className="font-semibold mb-4">Occasions</h3>
            <ul className="space-y-2">
              {footerLinks.occasions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                +91 98765 43210
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                hello@bloomcart.com
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Delhi, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {currentYear} BloomCart. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}