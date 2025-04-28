"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, MessageSquare, CreditCard } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&h=1200')] bg-cover bg-center opacity-10" />

        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Meet Your AI Shopping Concierge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-foreground/80"
          >
            Stop browsing endless catalogs. Simply ask, show, or upload what you
            need, and Baiyit finds, compares, and purchases it for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="glass-button text-lg px-8 py-6 rounded-full"
              onClick={() => router.push("/concierge")}
            >
              Start Shopping
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <MessageSquare className="h-12 w-12 text-secondary" />,
                title: "Ask",
                description:
                  "Describe what you need in natural language. No filters or categories needed.",
              },
              {
                icon: <ShoppingBag className="h-12 w-12 text-secondary" />,
                title: "See",
                description:
                  "Get personalized recommendations with all the details you need to decide.",
              },
              {
                icon: <CreditCard className="h-12 w-12 text-secondary" />,
                title: "Buy",
                description:
                  "Choose your perfect match and complete your purchase in seconds.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="frosted-card p-8 text-center"
              >
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience the Future of Shopping
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Upload an image of what you want, ask for recommendations, or
                just describe your needs. Watch as Baiyit finds exactly what
                you&apos;re looking for, comparing options and highlighting the
                best ones for you.
              </p>
              <Button
                className="glass-button text-lg"
                onClick={() => router.push("/concierge")}
              >
                Try the Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="aspect-video glass-panel overflow-hidden rounded-2xl">
                <div className="w-full h-full bg-[url('https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&h=800')] bg-cover bg-center"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
