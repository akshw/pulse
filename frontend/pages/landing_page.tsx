"use client";

import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Search,
  ArrowRight,
  ChevronRight,
  Star,
  Menu,
} from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}
const FadeInWhenVisible = ({ children }: Props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function BlackWhiteZapierLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const popularApps = [
    { name: "Gmail", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Slack", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Trello", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Dropbox", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Google Sheets", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Twitter", icon: "/placeholder.svg?height=40&width=40" },
  ];

  const popularZaps = [
    {
      trigger: "Gmail",
      action: "Slack",
      description: "Send Slack messages for new Gmail emails",
    },
    {
      trigger: "Trello",
      action: "Google Sheets",
      description: "Add new Trello cards to a Google Sheet",
    },
    {
      trigger: "Twitter",
      action: "Buffer",
      description: "Add tweets to your Buffer queue",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <motion.header
        className={`px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Link className="flex items-center justify-center" href="#">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="h-8 w-8 text-white" />
          </motion.div>
          <span className="ml-2 text-2xl font-bold text-white">Zapier</span>
        </Link>
        <nav className="hidden md:flex ml-auto gap-6">
          {["Product", "Solutions", "Pricing", "Developer"].map((item) => (
            <Link
              key={item}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              href="#"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex ml-6 items-center gap-2">
          <Button
            variant="outline"
            className="text-sm text-white border-white hover:bg-gray-800"
          >
            Log in
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200 text-sm">
            Sign up free
          </Button>
        </div>
        <Button
          variant="ghost"
          className="md:hidden ml-auto text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.header>
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden fixed inset-0 z-40 bg-gray-900 p-4 pt-20"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <nav className="flex flex-col gap-4">
            {["Product", "Solutions", "Pricing", "Developer"].map((item) => (
              <Link
                key={item}
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                href="#"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full text-white border-white hover:bg-gray-800"
            >
              Log in
            </Button>
            <Button className="w-full bg-white text-black hover:bg-gray-200">
              Sign up free
            </Button>
          </div>
        </motion.div>
      )}
      <main className="flex-1 pt-16">
        <section className="w-full py-20 md:py-32 lg:py-48 bg-black">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Automate Your Work, Amplify Your Productivity
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Zapier moves info between your web apps automatically, so you can
              focus on your most important work.
            </motion.p>
            <motion.div
              className="max-w-3xl mx-auto mb-12 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-white blur-xl opacity-10 rounded-full"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="w-full pl-12 pr-4 py-4 rounded-full text-lg shadow-lg focus:ring-2 focus:ring-white bg-gray-900 text-white transition-all"
                  placeholder="Search for apps you use..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {popularApps.map((app, index) => (
                <motion.div
                  key={app.name}
                  className="flex items-center bg-gray-900 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {/* <img src={app.icon} alt={app.name} className="w-6 h-6 mr-2" /> */}
                  <span className="text-sm font-medium text-white">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Get started free
              </Button>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                Explore 5,000+ app integrations
              </h2>
            </FadeInWhenVisible>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[...Array(18)].map((_, i) => (
                <FadeInWhenVisible key={i}>
                  <motion.div
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shadow-md group-hover:shadow-lg transition-all transform group-hover:scale-110">
                      {/* <img
                        src={`/placeholder.svg?height=64&width=64`}
                        alt={`App ${i + 1}`}
                        className="w-12 h-12"
                      /> */}
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      App {i + 1}
                    </span>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
            <FadeInWhenVisible>
              <div className="text-center mt-16">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-gray-800 px-8 py-3 rounded-full text-lg"
                >
                  See all apps <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                Popular Zaps
              </h2>
            </FadeInWhenVisible>
            <div className="grid gap-8 md:grid-cols-3">
              {popularZaps.map((zap, index) => (
                <FadeInWhenVisible key={index}>
                  <motion.div
                    className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {/* <img src={`/placeholder.svg?height=40&width=40`} alt={zap.trigger} className="w-10 h-10" /> */}
                      </motion.div>
                      <ArrowRight className="w-8 h-8 text-white mx-4" />
                      <motion.div
                        className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
                        animate={{ rotate: [0, -360] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {/* <img src={`/placeholder.svg?height=40&width=40`} alt={zap.action} className="w-10 h-10" /> */}
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {zap.description}
                    </h3>
                    <Button
                      variant="outline"
                      className="w-full mt-4 py-3 rounded-full text-white border-white hover:bg-gray-800"
                    >
                      Use this Zap
                    </Button>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeInWhenVisible>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Zapier makes you happier
                </h2>
                <p className="text-xl text-gray-400">
                  Our customers use Zapier to do more with less time.
                </p>
              </div>
            </FadeInWhenVisible>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <FadeInWhenVisible key={i}>
                  <motion.div
                    className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Star className="w-6 h-6 text-white fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 text-lg">
                      Zapier is amazing. Took us 30 seconds to setup an
                      integration that saves us 2 hours of work every day.
                    </p>
                    <div className="flex items-center">
                      <img
                        src={`/placeholder.svg?height=48&width=48`}
                        alt={`Customer ${i}`}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-gray-800"
                      />
                      <div>
                        <p className="font-semibold text-lg text-white">
                          Jane Doe
                        </p>
                        <p className="text-sm text-gray-400">
                          CEO, Company {i}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-white text-black">
          <div className="container mx-auto px-4 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Connect your apps and automate workflows
              </h2>
              <p className="text-xl mb-12 max-w-3xl mx-auto">
                Easy automation for busy people. Zapier moves info between your
                web apps automatically, so you can focus on your most important
                work.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-black text-white hover:bg-gray-800 text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Sign up free
                </Button>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {["Product", "Solutions", "Developers", "Company"].map(
              (category) => (
                <div key={category}>
                  <h3 className="font-semibold text-lg mb-4 text-white">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {["Link 1", "Link 2", "Link 3", "Link 4"].map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2023 Zapier Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                (social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
