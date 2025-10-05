"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { User, Home, Utensils, AlertCircle, Target, ArrowRight, Edit, Weight, Ruler, Calendar, Users, Dumbbell, Activity, DollarSign, ChefHat, Clock, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<"view" | "edit">("edit");
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    householdSize: "",
    dietaryPreference: "",
    allergies: "",
    goal: "",
  });

  useEffect(() => {
    // Load existing profile data from localStorage
    const profileStr = localStorage.getItem("userProfile");
    if (profileStr) {
      const profile = JSON.parse(profileStr);
      setProfileData(profile);

      // Check if profile is complete (has data from all 3 steps)
      const isComplete = profile.budget && profile.cookingSkill && profile.maxPrepTime;
      setViewMode(isComplete ? "view" : "edit");

      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        householdSize: profile.householdSize || "",
        dietaryPreference: profile.dietaryPreference || "",
        allergies: profile.allergies || "",
        goal: profile.goal || "",
      });
    } else if (session?.user) {
      // If no saved data but user logged in with Google, pre-fill name and email
      setFormData((prev) => ({
        ...prev,
        name: session.user?.name || "",
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.householdSize ||
        !formData.dietaryPreference || !formData.goal) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    console.log(formData);
    localStorage.setItem("userProfile", JSON.stringify(formData));
    router.push("/profile/step-2");
  };

  const getGoalLabel = (goal: string) => {
    const goals: any = {
      "lose-weight": "Perder peso",
      "gain-muscle": "Ganar músculo",
      "recomposition": "Recomposición corporal",
      "maintain": "Mantener peso"
    };
    return goals[goal] || goal;
  };

  const getDietLabel = (diet: string) => {
    const diets: any = {
      "omnivore": "Omnívoro",
      "vegetarian": "Vegetariano",
      "vegan": "Vegano",
      "pescatarian": "Pescetariano"
    };
    return diets[diet] || diet;
  };

  // If viewing complete profile
  if (viewMode === "view" && profileData) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Mi Perfil
                  </h1>
                  <p className="text-gray-600">
                    Tu información personal y preferencias
                  </p>
                </div>
                <Button
                  onClick={() => setViewMode("edit")}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="shadow-lg border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Nombre</Label>
                    <p className="font-medium">{profileData.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Email</Label>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Personas en el hogar</Label>
                    <p className="font-medium">{profileData.householdSize}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Info */}
              <Card className="shadow-lg border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Información Física
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500 text-sm">Peso</Label>
                      <p className="font-medium">{profileData.weight} kg</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Altura</Label>
                      <p className="font-medium">{profileData.height} cm</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500 text-sm">Edad</Label>
                      <p className="font-medium">{profileData.age} años</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Género</Label>
                      <p className="font-medium capitalize">{profileData.gender === "male" ? "Masculino" : profileData.gender === "female" ? "Femenino" : "Otro"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Ejercicio</Label>
                    <p className="font-medium">
                      {profileData.exercises === "yes" ? `Sí (${profileData.exerciseFrequency} veces/semana)` : "No"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Nivel de Actividad</Label>
                    <p className="font-medium capitalize">{profileData.activityLevel}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Diet & Goals */}
              <Card className="shadow-lg border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Dieta y Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Objetivo</Label>
                    <p className="font-medium">{getGoalLabel(profileData.goal)}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Preferencia Dietética</Label>
                    <p className="font-medium">{getDietLabel(profileData.dietaryPreference)}</p>
                  </div>
                  {profileData.allergies && (
                    <div>
                      <Label className="text-gray-500 text-sm">Alergias</Label>
                      <p className="font-medium">{profileData.allergies}</p>
                    </div>
                  )}
                  {profileData.foodDislikes && (
                    <div>
                      <Label className="text-gray-500 text-sm">Alimentos que no gustan</Label>
                      <p className="font-medium">{profileData.foodDislikes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cooking Preferences */}
              <Card className="shadow-lg border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-green-600" />
                    Preferencias de Cocina
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Presupuesto</Label>
                    <p className="font-medium capitalize">{profileData.budget}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Nivel de Cocina</Label>
                    <p className="font-medium capitalize">{profileData.cookingSkill}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Tiempo Máximo de Preparación</Label>
                    <p className="font-medium">{profileData.maxPrepTime === "60+" ? "1 hora o más" : `${profileData.maxPrepTime} minutos`}</p>
                  </div>
                  {profileData.cuisinePreferences && profileData.cuisinePreferences.length > 0 && (
                    <div>
                      <Label className="text-gray-500 text-sm">Cocinas Preferidas</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.cuisinePreferences.map((cuisine: string) => (
                          <Badge key={cuisine} variant="secondary" className="capitalize">
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    1
                  </div>
                  <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Paso 1 de 3
                  </span>
                </div>
                <span>•</span>
                <span>Información básica</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Perfil de Usuario</CardTitle>
                <CardDescription>
                  Cuéntanos sobre ti y tu hogar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Nombre
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-2 focus:border-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <span className="text-gray-500">@</span>
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-2 focus:border-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="household" className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-500" />
                Número de personas en el hogar
              </Label>
              <Input
                id="household"
                type="number"
                min="1"
                placeholder="Ingresa el número de personas"
                value={formData.householdSize}
                onChange={(e) =>
                  setFormData({ ...formData, householdSize: e.target.value })
                }
                className="border-2 focus:border-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietary" className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-gray-500" />
                Preferencia dietética
              </Label>
              <Select
                value={formData.dietaryPreference}
                onValueChange={(value) =>
                  setFormData({ ...formData, dietaryPreference: value })
                }
                required
              >
                <SelectTrigger id="dietary" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tu preferencia dietética" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="omnivore">Omnívoro</SelectItem>
                  <SelectItem value="vegetarian">Vegetariano</SelectItem>
                  <SelectItem value="vegan">Vegano</SelectItem>
                  <SelectItem value="pescatarian">Pescetariano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                Alergias alimentarias
              </Label>
              <Textarea
                id="allergies"
                placeholder="Ej: nueces, lácteos, mariscos (opcional)"
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
                rows={3}
                className="border-2 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />
                Objetivo
              </Label>
              <Select
                value={formData.goal}
                onValueChange={(value) =>
                  setFormData({ ...formData, goal: value })
                }
                required
              >
                <SelectTrigger id="goal" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-weight">Perder peso</SelectItem>
                  <SelectItem value="gain-muscle">Ganar músculo</SelectItem>
                  <SelectItem value="recomposition">Recomposición corporal</SelectItem>
                  <SelectItem value="maintain">Mantener peso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
