"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, MessageSquare, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/chat/chat-input";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&h=1200')] bg-cover bg-center opacity-10" />

        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight"
          >
            The World&apos;s First AI-Driven Store
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-foreground/80"
          >
            No more endless scrolling. Just describe, show, or upload what you
            want, and Baiyit gets just the best deal, instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ChatInput />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-muted/60 to-muted/40">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary"
          >
            How Baiyit Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <MessageSquare className="h-12 w-12 text-primary" />,
                title: "Just Say It",
                description:
                  "Describe, show, or upload anything you want. No categories, no menus—just speak your mind.",
              },
              {
                icon: <ShoppingBag className="h-12 w-12 text-primary" />,
                title: "AI Finds It",
                description:
                  "Baiyit instantly searches, compares, and curates the best options for you. Personalized, effortless, fast.",
              },
              {
                icon: <CreditCard className="h-12 w-12 text-primary" />,
                title: "You Own It",
                description:
                  "Buy, track, return, or ask anything about your order—Baiyit handles it all, start to finish.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative backdrop-blur-md bg-white/10 dark:bg-slate-800/20 rounded-2xl border border-white/20 dark:border-slate-700/40 shadow-lg p-8 text-center transition-all"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex justify-center mb-6 bg-gradient-to-br from-primary/10 to-secondary/5 backdrop-blur-sm p-4 rounded-full mx-auto w-20 h-20 items-center shadow-inner relative z-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.2 }}
                    whileHover={{ rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                <h3 className="relative z-10 text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {step.title}
                </h3>
                <p className="relative z-10 text-foreground/80">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-b from-muted/40 to-muted/20">
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
                Experience Shopping, Reinvented
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Forget endless scrolling. With Baiyit, you simply ask—and AI
                delivers. Discover, buy, return, and manage everything in one
                place. This is the future of shopping.
              </p>
              <Button
                size="lg"
                className="text-lg p-6 rounded-lg backdrop-blur-sm bg-primary/90 hover:bg-primary/80 shadow-lg transition-all duration-300"
                onClick={() => router.push("/concierge")}
              >
                Shop with AI Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="aspect-video overflow-hidden rounded-2xl backdrop-blur-md border border-white/20 dark:border-slate-700/30 shadow-xl">
                <div className="w-full h-full bg-[url('https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&h=800')] bg-cover bg-center transform hover:scale-105 transition-transform duration-700"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
