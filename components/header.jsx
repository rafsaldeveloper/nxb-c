"use client"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";
import nexusLogo from "../public/assets/header images/nexus_white_no_bg.png";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (dropdownRef.current) {
            if (isOpen) {
                setHeight(dropdownRef.current.scrollHeight);
            } else {
                setHeight(0);
            }
        }
    }, [isOpen]);

    return (
        // <header className="bg-[#B80D2D] text-white shadow-lg hidden">
        //     <div className="container mx-auto px-4 max-w-7xl">
        //         <div className="flex items-center justify-between h-16">
        //             {/* Logo */}
        //              <Link href='/' className="flex items-center space-x-2">
        //                 <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} />
        //             </Link>

        //             {/* Navigation */}
        //             <nav className="hidden md:flex items-center space-x-8">
        //                 <Link href="/" className="hover:text-gray-200 transition-colors font-medium">
        //                     Home
        //                 </Link>
        //                 <Link href="/about" className="hover:text-gray-200 transition-colors font-medium">
        //                     About
        //                 </Link>
        //                 <Link href="/services" className="hover:text-gray-200 transition-colors font-medium">
        //                     Services
        //                 </Link>
        //             </nav>

        //             {/* Auth Buttons */}
        //             <div className="flex items-center space-x-3">
        //                 {/* User Role Dropdown with custom UI */}
        //                 <DropdownMenu>
        //                     <DropdownMenuTrigger asChild>
        //                         <button
        //                             className="flex items-center gap-2 px-4 py-2 rounded bg-white/10 text-white hover:bg-white hover:text-[#B80D2D] transition border border-white/30 shadow-sm"
        //                             style={{ outline: "none", boxShadow: "none" }}
        //                             tabIndex={0}
        //                         >
        //                             <User className="w-4 h-4" />
        //                             <span>Select Role</span>
        //                             <ChevronDown className="w-4 h-4" />
        //                         </button>
        //                     </DropdownMenuTrigger>
        //                     <DropdownMenuContent align="end">
        //                         <DropdownMenuItem
        //                             onSelect={() => { window.location.href = "/signin"; }}
        //                             className="cursor-pointer"
        //                         >
        //                             <User className="w-4 h-4 mr-2 text-[#B80D2D]" /> Client
        //                         </DropdownMenuItem>
        //                         <DropdownMenuItem
        //                             onSelect={() => { window.location.href = "/vendor"; }}
        //                             className="cursor-pointer"
        //                         >
        //                             <User className="w-4 h-4 mr-2 text-gray-500" /> Vendor
        //                         </DropdownMenuItem>
        //                     </DropdownMenuContent>
        //                 </DropdownMenu>
        //                 {/* <Link href="/signup">
        //                     <Button className="bg-white text-[#B80D2D] hover:bg-gray-100">Sign Up</Button>
        //                 </Link> */}
        //             </div>
        //         </div>
        //     </div>
        // </header>

        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <Link href="/">
                        <img
                            src="/assets/header images/nexus_logo_no_bg.png"
                            alt="Nexus Built"
                            className="h-12 w-auto"
                        />
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="hover:text-[#B93239] transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-[#B93239] transition-colors">About Us</Link>
                        <Link href="/services" className="hover:text-[#B93239] transition-colors">Services</Link>
                        <Link href="/contactUs" className="hover:text-[#B93239] transition-colors">Contact Us</Link>
                    </nav>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Button asChild variant="ghost">
                        <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-[#B93239] hover:bg-[#A02A31] text-white shadow-lg hover:shadow-xl transition-all">
                        <Link href="/vendor/register">Join as Vendor</Link>
                    </Button>
                </div>

                {/* Hamburger Menu Icon */}
                <div className="md:hidden">
                    <button
                        type="button"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {/* Animated Mobile Dropdown Menu */}
            <div
                ref={dropdownRef}
                style={{
                    height: `${height}px`,
                    transition: "height 300ms ease",
                    overflow: "hidden",
                }}
                className="md:hidden bg-white/80 backdrop-blur-md shadow-md px-4"
            >
                <div className="py-4 flex flex-col space-y-3">
                    <Link href="/" className="hover:text-[#B93239] transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-[#B93239] transition-colors">About Us</Link>
                    <Link href="/services" className="hover:text-[#B93239] transition-colors">Services</Link>
                    <Link href="/contactUs" className="hover:text-[#B93239] transition-colors">Contact Us</Link>

                    <div className="pt-2 flex flex-col space-y-2">
                        <Button asChild variant="ghost" className="w-full">
                            <Link href="/signin">Sign In</Link>
                        </Button>
                        <Button asChild className="bg-[#B93239] hover:bg-[#A02A31] text-white shadow-lg hover:shadow-xl transition-all w-full">
                            <Link href="/vendor/register">Join as Vendor</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>

    )
}
