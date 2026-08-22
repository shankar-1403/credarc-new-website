"use client";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import LogoDark from "../../assets/credarc_dark.webp";
import LogoLight from "../../assets/credarc_white.webp";
import React, { useRef, useState } from "react";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full font-nav", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 8px 30px rgba(2, 47, 132, 0.08)"
          : "none",
        width: visible ? "min(1180px, 96%)" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center gap-4 self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-white/90 px-5 ring-1 ring-[#D5DDE8]/80",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, visible }) => {
  const [hovered, setHovered] = useState(null);
  const atTop = !visible;

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden min-w-0 flex-1 flex-row items-center justify-center gap-0.5 text-[13px] font-medium tracking-[-0.01em] lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className={cn(
            "relative shrink-0 px-2.5 py-2 transition xl:px-3",
            atTop
              ? "text-white/90 hover:text-white"
              : "text-[#5A6B7D] hover:text-[#022F84]"
          )}
          key={`link-${idx}`}
          to={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className={cn(
                "absolute inset-0 h-full w-full rounded-full",
                atTop ? "bg-white/15" : "bg-[#E8EEF8]"
              )}
            />
          )}
          <span className="relative z-20 whitespace-nowrap">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 8px 30px rgba(2, 47, 132, 0.08)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "1rem" : "0",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/90 ring-1 ring-[#D5DDE8]/80",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className, visible }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-3",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 mx-3 flex flex-col items-start justify-start gap-4 rounded-2xl bg-white px-4 py-8 shadow-[0_20px_50px_rgba(2,47,132,0.12)] ring-1 ring-[#D5DDE8]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick, visible }) => {
  const iconClass = cn(
    "size-6 cursor-pointer transition-colors",
    visible ? "text-[#0A1628]" : "text-white"
  );

  return isOpen ? (
    <X className={iconClass} onClick={onClick} />
  ) : (
    <Menu className={iconClass} onClick={onClick} />
  );
};

export const NavbarLogo = ({ visible }) => {
  const atTop = !visible;

  return (
    <Link
      to="/"
      className="relative z-20 flex shrink-0 items-center py-1"
    >
      <img
        src={atTop ? LogoLight : LogoDark}
        alt="CredArc Logo"
        className={cn(
          "w-auto transition-all duration-300",
          visible ? "h-12" : "h-12"
        )}
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full bg-[#022F84] text-white text-[13px] font-semibold tracking-[-0.01em] relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center shrink-0 whitespace-nowrap";

  const variantStyles = {
    primary: "shadow-[0_10px_24px_-12px_rgba(2,47,132,0.65)]",
    secondary:
      "bg-transparent text-[#022F84] shadow-none ring-1 ring-[#022F84]/20",
    dark: "bg-[#0A1628] text-white",
    gradient: "bg-gradient-to-b from-[#1A9B8E] to-[#158277] text-white",
  };

  return (
    <Link
      to={href || "/"}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
};
