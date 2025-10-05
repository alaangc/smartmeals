"use client";

import Link from "next/link";
import { ArrowRight, Utensils, Calendar, ChefHat, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user has a saved profile
    const profileStr = localStorage.getItem("userProfile");
    setHasProfile(!!profileStr);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Planificación inteligente de comidas
                </span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                SmartMeals
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Crea planes de comidas personalizados que se adaptan a tu estilo de vida, objetivos y preferencias
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={hasProfile ? "/meal-plan" : "/login"}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  {hasProfile ? "Ver mi plan" : "Comenzar ahora"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!hasProfile && (
                <Link href="/meal-plan">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50">
                    Ver ejemplo
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Utensils className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Planes Personalizados
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Recibe planes de comidas adaptados a tus objetivos, preferencias dietéticas y alergias
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Organización Semanal
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Planifica toda tu semana con desayuno, almuerzo y cena organizados por día
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <ChefHat className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Recetas Detalladas
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Accede a recetas completas con ingredientes, instrucciones y tiempos de preparación
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu alimentación?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están disfrutando de una alimentación más saludable y organizada
          </p>
          <Link href={hasProfile ? "/meal-plan" : "/login"}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg">
              {hasProfile ? "Ver mi plan" : "Crear mi plan gratis"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="font-semibold text-lg text-gray-900 mb-2">SmartMeals</p>
            <p className="text-sm">© 2025 SmartMeals. Planificación inteligente de comidas.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
