"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { ChefHat, DollarSign, Clock, AlertCircle, UtensilsCrossed, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export default function ProfileStep3Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    budget: "",
    cookingSkill: "",
    maxPrepTime: "",
    foodDislikes: "",
    cuisinePreferences: [] as string[],
  });

  useEffect(() => {
    // Check if previous steps data exists and load existing step 3 data
    const profileStr = localStorage.getItem("userProfile");
    if (!profileStr) {
      router.push("/profile");
    } else {
      // Load existing step 3 data if available
      const profile = JSON.parse(profileStr);
      setFormData({
        budget: profile.budget || "",
        cookingSkill: profile.cookingSkill || "",
        maxPrepTime: profile.maxPrepTime || "",
        foodDislikes: profile.foodDislikes || "",
        cuisinePreferences: profile.cuisinePreferences || [],
      });
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.budget || !formData.cookingSkill || !formData.maxPrepTime) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // Get existing profile data
    const existingProfileStr = localStorage.getItem("userProfile");
    const existingProfile = existingProfileStr ? JSON.parse(existingProfileStr) : {};

    // Merge with new data
    const completeProfile = {
      ...existingProfile,
      ...formData,
    };

    localStorage.setItem("userProfile", JSON.stringify(completeProfile));
    console.log("Complete profile:", completeProfile);

    router.push("/meal-plan");
  };

  const handleBack = () => {
    router.push("/profile/step-2");
  };

  const toggleCuisine = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter((c) => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine],
    }));
  };

  const cuisines = [
    { id: "mexicana", label: "Mexicana" },
    { id: "italiana", label: "Italiana" },
    { id: "asiatica", label: "Asiática" },
    { id: "mediterranea", label: "Mediterránea" },
    { id: "estadounidense", label: "Estadounidense" },
    { id: "latina", label: "Latinoamericana" },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-2 border-gray-100">
          <CardHeader>
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Paso 3 de 3
                  </span>
                </div>
                <span>•</span>
                <span>Preferencias de cocina</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Preferencias de Cocina</CardTitle>
                <CardDescription>
                  Últimos detalles para personalizar tu experiencia
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                Presupuesto
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  setFormData({ ...formData, budget: value })
                }
                required
              >
                <SelectTrigger id="budget" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tu presupuesto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economico">Económico</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cookingSkill" className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-gray-500" />
                Nivel de cocina
              </Label>
              <Select
                value={formData.cookingSkill}
                onValueChange={(value) =>
                  setFormData({ ...formData, cookingSkill: value })
                }
                required
              >
                <SelectTrigger id="cookingSkill" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principiante">Principiante</SelectItem>
                  <SelectItem value="intermedio">Intermedio</SelectItem>
                  <SelectItem value="avanzado">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrepTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                Tiempo máximo de preparación
              </Label>
              <Select
                value={formData.maxPrepTime}
                onValueChange={(value) =>
                  setFormData({ ...formData, maxPrepTime: value })
                }
                required
              >
                <SelectTrigger id="maxPrepTime" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tiempo máximo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60+">1 hora o más</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodDislikes" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                Alimentos que no te gustan (opcional)
              </Label>
              <Textarea
                id="foodDislikes"
                placeholder="Ej: champiñones, pimientos, cebolla..."
                value={formData.foodDislikes}
                onChange={(e) =>
                  setFormData({ ...formData, foodDislikes: e.target.value })
                }
                rows={3}
                className="border-2 focus:border-green-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-gray-500" />
                Tipos de cocina preferidos
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {cuisines.map((cuisine) => (
                  <div key={cuisine.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine.id}
                      checked={formData.cuisinePreferences.includes(cuisine.id)}
                      onCheckedChange={() => toggleCuisine(cuisine.id)}
                    />
                    <label
                      htmlFor={cuisine.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {cuisine.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
              <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Plan de Comidas
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
