"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, CalendarDays, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [localUser, setLocalUser] = useState<{ name: string } | null>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    // Check localStorage for user profile
    const profileStr = localStorage.getItem("userProfile");
    if (profileStr) {
      const profile = JSON.parse(profileStr);
      setLocalUser({ name: profile.name || "Usuario" });
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("userProfile");
    localStorage.removeItem("mealPlan");
    setLocalUser(null);
    // Sign out from NextAuth if session exists
    if (session) {
      signOut();
    } else {
      // If no session, just redirect to home
      router.push("/");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              SmartMeals
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>

            <Link
              href="/profile"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/profile")
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </Link>

            <Link
              href="/meal-plan"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive("/meal-plan")
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              <span>Plan de Comidas</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {session || localUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  {session?.user?.name || localUser?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Cerrar sesión</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg flex-1 ${
              isActive("/")
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg flex-1 ${
              isActive("/profile")
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Perfil</span>
          </Link>

          <Link
            href="/meal-plan"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg flex-1 ${
              isActive("/meal-plan")
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            <CalendarDays className="h-5 w-5" />
            <span className="text-xs">Comidas</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
