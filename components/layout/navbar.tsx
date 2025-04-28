"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu, X, ShoppingBag } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useBag } from '@/contexts/bag-context'
import BagDrawer from '@/components/shop/bag-drawer'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useBag()
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/concierge', label: 'Concierge' },
    { href: '/showroom', label: 'Showroom' },
    { href: '/acquisitions', label: 'Acquisitions' },
    { href: '/sessions', label: 'Sessions' },
    { href: '/hub', label: 'Hub' },
  ]
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-primary">Baiyit</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pathname === link.href 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              
              {/* Bag Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(true)}
                className="relative"
                aria-label="Open bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-md shadow-lg md:hidden"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg ${
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
      
      {/* Bag Drawer */}
      <BagDrawer />
    </>
  )
}