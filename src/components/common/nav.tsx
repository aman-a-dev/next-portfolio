"use client";

import {
  AnimatedMenu,
  AnimatedMenuButton,
  AnimatedMenuButtonToggleIcon,
  AnimatedMenuList,
  AnimatedMenuItem,
  CloseAnimatedMenu,
} from "@/components/vendor/animated-menu";
import { Variants, motion } from "motion/react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Home, Phone, Book } from "lucide-react";

type MenuItemsType = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const menuItems: MenuItemsType[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Phone />,
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: <Book />,
  },
];
const socialLinks: { title: string; href: string }[] = [
  {
    title: "Telegram",
    href: "https://t.me/aman_a_dev",
  },
  {
    title: "Github",
    href: "https://github.com/aman-a-dev",
  },
  {
    title: "Email",
    href: "mailto:amanuelantenha@gmail.com'",
  },
];
const menuListvariants = {
  open: {
    width: 320,
    height: 420,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  close: {
    width: 48,
    height: 48,
    transition: { duration: 0.75, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
  },
} as Variants;

const menuItemVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.55 + i * 0.1,
      duration: 0.75,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -100,
    transition: {
      delay: 0.25 + -i * 0.1,
    },
  }),
} as Variants;

export default function NavBar() {
  return (
    <div className="w-full self-start z-[999] flex items-start justify-between px-8 py-2 fixed top-0 left-0 right-0">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="flex gap-2 bg-linear-to-bl from-white to-white/50 dark:from-black dark:to-black/50 shadow-md rounded-3xl backdrop-blur-sm pr-3"
      >
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggle />
      </motion.div>
      <div className="flex gap-4">
        <AnimatedMenu className="relative ">
          <AnimatedMenuButton className="size-12 text-white dark:text-black">
            <AnimatedMenuButtonToggleIcon
              size="md"
              className="*:rounded text-black dark:text-white"
            />
          </AnimatedMenuButton>
          <AnimatedMenuList
            variants={menuListvariants}
            className="absolute right-0 top-0 bg-linear-to-bl from-white to-white/50 dark:from-black dark:to-black/50 shadow-md rounded-3xl backdrop-blur-sm"
          >
            <div className="flex flex-col px-6 justify-evenly gap-6 items-start size-full">
              <div className="flex flex-col items-start gap-4 *:transition-blur *:duration-300 [&:hover>*]:blur-[2px] [&>*:hover]:blur-none">
                {menuItems.map((item, i) => (
                  <div className="overflow-hidden w-full" key={item.title}>
                    <AnimatedMenuItem
                      className="perspective-dramatic perspective-origin-bottom"
                      variants={menuItemVariants}
                      order={i}
                    >
                      <CloseAnimatedMenu>
                        <Link
                          className="text-black dark:text-white text-2xl font-medium flex justify-between items-center w-[270px]"
                          href={item.href}
                          title={item.title}
                        >
                          <span>{item.title}</span>
                          {item.icon}
                        </Link>
                      </CloseAnimatedMenu>
                    </AnimatedMenuItem>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 *:transition-blur *:duration-300 [&:hover>*]:blur-[2px] [&>*:hover]:blur-none">
                {socialLinks.map((item, i) => (
                  <div className="overflow-hidden" key={item.title}>
                    <AnimatedMenuItem
                      order={i + menuItems.length}
                      variants={menuItemVariants}
                    >
                      <CloseAnimatedMenu>
                        <Link
                          className="font-medium text-black dark:text-white"
                          href={item.href}
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                      </CloseAnimatedMenu>
                    </AnimatedMenuItem>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedMenuList>
        </AnimatedMenu>
      </div>
    </div>
  );
}
