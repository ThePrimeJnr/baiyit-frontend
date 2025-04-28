"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/shop/product-card'
import { Product } from '@/types/product'

type RecommendationsPanelProps = {
  products: Product[]
}

export function RecommendationsPanel({ products }: RecommendationsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredProducts(
        products.filter(product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery, products])
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-background/80 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter recommendations..."
            className="pl-10"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <AnimatePresence>
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No recommendations yet</h3>
              <p className="text-muted-foreground max-w-xs">
                Chat with Baiyit to receive personalized product recommendations based on your needs.
              </p>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center p-8">
                  <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No matching products</h3>
                  <p className="text-muted-foreground">
                    Try a different search term or ask the concierge for more options.
                  </p>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}