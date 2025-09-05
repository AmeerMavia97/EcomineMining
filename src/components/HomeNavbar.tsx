import React, { useState, useEffect } from "react";
import { Menu, X, Heart, ShoppingCart, RepeatIcon, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/lib/store/store";
import { logout, setUser } from "@/lib/feature/auth/authSlice";
import { useGetCurrentUserQuery, useLogoutMutation } from "@/lib/feature/auth/authThunk";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface NavLink {
    label: string;
    href: string;
    onClick?: () => void;
}

const HomeNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth,
    );

    const router = useRouter();
    const { isLoading, refetch } = useGetCurrentUserQuery();
    const [logoutAPI] = useLogoutMutation();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            // Call the logout API
            const result = await logoutAPI().unwrap();
            console.log("Logout API response:", result);

            // Dispatch Redux action to clear state
            dispatch(logout());

            // Clear localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Force refresh the page to ensure all state is reset
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);

            // Even if the API call fails, still clear local state
            dispatch(logout());
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Force refresh the page
            window.location.href = "/";
        }
    };

    const userMenuItems: NavLink[] = [
        { label: "Profile", href: "/profile" },

    ];

    const navLinks: NavLink[] = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Shop", href: "/shop" },
        { label: "Contact Us", href: "/contactUs" },
    ];

    return (
        <header className="bg-[#101010] text-white px-20">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <div className="">
                    <div className="flex items-center justify-between py-7 ">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-3xl font-bold">Ecomine</span>
                            <div className="flex h-8.5 w-7 items-center justify-center rounded-full bg-green-500">
                                <span className="text-xl font-bold">X</span>
                            </div>
                        </Link>
                        <div className="flex items-center justify-between gap-20">
                            <div className="relative">
                                <div className="flex items-center space-x-7">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className={`relative  font-[500] hover:text-green-500 text-[14px] transition-colors 
                                         ${pathname === link.href
                                                    ? " text-green-500 "
                                                    : "text-white"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* Main Navigation */}
                            <div className="flex  items-center gap-4">
                                <div className="flex items-center space-x-6">
                                    {isLoading ? (
                                        <div className="h-6 w-24 animate-pulse rounded bg-gray-700"></div>
                                    ) : isAuthenticated ? (
                                        <div className="group relative z-50">
                                            <button className="flex items-center space-x-2 transition-colors hover:text-green-500">
                                                {/* <User className="h-5 w-5" /> */}

                                                <Link href="/profile">
                                                    <span className="text-green-500 font-bold">
                                                        Dashbord
                                                    </span>
                                                </Link>
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            href="/auth/signin"
                                            className="transition-colors hover:text-green-500 text-[12px] font-[550] text-[#dedede] tracking-[0.5px]"
                                        >
                                            LOGIN / REGISTER
                                        </Link>
                                    )}
                                </div>

                                <div>
                                    <button className="!font-semibold border-[1px] px-4 py-2 text-[13.5px] rounded-full border-green-500">Book Appointment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-4">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-white focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Center Logo */}
                    <Link href="/" className="flex items-center space-x-2 ml-5">
                        <span className="text-3xl font-bold">Ecomine</span>
                        <div className="flex -ml-2 h-8 w-7 items-center justify-center rounded-full bg-green-500">
                            <span className="text-xl font-bold">X</span>
                        </div>
                    </Link>

                    {/* User Menu Items */}
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/profile"
                                className="text-sm font-medium text-white hover:text-green-500"
                            >
                                <span className="text-green-500 font-bold l">Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-white hover:text-green-500"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/signin"
                            className="text-sm font-medium text-white hover:text-green-500"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900">
                        <div className="p-4">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-white"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Search for products"
                                    className="w-full rounded-lg bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <nav className="mt-6 flex flex-col space-y-12">
                                {/* Navigation Links */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="py-2 text-lg transition-colors hover:text-green-500"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HomeNavbar;