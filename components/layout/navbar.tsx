import BagDrawer from "@/components/shop/bag-drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useBag } from "@/contexts/bag-context";
import { AnimatePresence, motion } from "framer-motion";
import { User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { totalItems, setIsOpen } = useBag();
  const [scrolled, setScrolled] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const router = useRouter();

  // Mock user data - replace with actual auth data
  const isLoggedIn = false;
  const user = {
    name: "Destiny",
    image:
      "https://theprimejnr.com/_next/image?url=%2Fimages%2Fdestiny-saturday.png&w=96&q=75", // Replace with actual image path
  };

  const texts = [
    "Baiyit: The Fully AI-Powered Store 🤖",
    "Experience AI-Driven Shopping Revolution 🚀",
    "100% AI-Powered Storefront Experience ✨",
    "The Store That Thinks For You 🧠",
    "AI That Perfectly Predicts Your Needs 🎯",
    "Beyond Assistance: AI Runs This Store 💯",
    "First True AI Shopping Ecosystem 🛍️",
    "Where AI Powers Everything, Perfectly 💎",
    "The Store That Learns & Evolves With You 🌱",
    "AI-First Shopping: Redefined by Baiyit 🔮",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const handleProfileClick = () => {
    router.push(isLoggedIn ? "/profile" : "/login");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/0 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-primary">
                Baiyit
              </span>
            </Link>

            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="relative">
                <div className="px-6 py-2 rounded-lg bg-secondary/20 backdrop-blur-md shadow-sm border text-sm font-medium text-foreground">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      {texts[currentText]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              {/* Bag Button */}
              <Button
                variant="subtle"
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
                {/* Profile/Login */}
                {isLoggedIn ? (
                <Button
                  variant="subtle"
                  size="lg"
                  onClick={handleProfileClick}
                  className="px-2 md:py-6 flex items-center gap-1.5"
                  aria-label="Profile"
                >
                  <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
                ) : (
                <Button
                  variant="subtle"
                  size="lg"
                  onClick={handleProfileClick}
                  className="px-2 md:py-6 flex items-center gap-1.5"
                  aria-label="Login"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
                )}
            </div>
          </div>
        </div>
      </header>

      {/* Bag Drawer */}
      <BagDrawer />
    </>
  );
}
