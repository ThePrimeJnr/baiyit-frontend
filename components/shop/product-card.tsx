"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"
import { useBag } from "@/hooks/use-bag"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showSpecs, setShowSpecs] = useState(false)
  const { addItem } = useBag()
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 400, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 })

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleGrabItem = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass-panel overflow-hidden h-full"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setShowSpecs(true)}
      onHoverEnd={() => setShowSpecs(false)}
    >
      <div className="relative aspect-square">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />

        {product.discount && (
          <div className="absolute top-2 left-2 bg-accent-sky text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-primary-navy line-clamp-2">{product.title}</h3>

          <div className="flex items-center ml-2 flex-shrink-0">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-baseline mb-4">
          <span className="text-lg font-bold text-primary-navy">${product.price.toFixed(2)}</span>

          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: showSpecs ? 1 : 0,
            height: showSpecs ? "auto" : 0,
          }}
          className="overflow-hidden mb-4"
        >
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <ul className="space-y-1">
              {product.specs?.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-accent-sky rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <Button className="w-full bg-accent-sky hover:bg-accent-sky/90" onClick={handleGrabItem}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Grab It
        </Button>
      </div>
    </motion.div>
  )
}
