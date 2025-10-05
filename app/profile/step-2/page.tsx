"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Activity, Weight, Ruler, Calendar, Users, Dumbbell, ArrowRight, ArrowLeft } from "lucide-react";

export default function ProfileStep2Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    exercises: "",
    exerciseFrequency: "",
    activityLevel: "",
  });

  useEffect(() => {
    // Check if step 1 data exists and load existing step 2 data
    const profileStr = localStorage.getItem("userProfile");
    if (!profileStr) {
      router.push("/profile");
    } else {
      // Load existing step 2 data if available
      const profile = JSON.parse(profileStr);
      setFormData({
        weight: profile.weight || "",
        height: profile.height || "",
        age: profile.age || "",
        gender: profile.gender || "",
        exercises: profile.exercises || "",
        exerciseFrequency: profile.exerciseFrequency || "",
        activityLevel: profile.activityLevel || "",
      });
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.weight || !formData.height || !formData.age ||
        !formData.gender || !formData.exercises || !formData.activityLevel) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // If exercises is yes, validate exercise frequency
    if (formData.exercises === "yes" && !formData.exerciseFrequency) {
      alert("Por favor indica la frecuencia de ejercicio");
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
    console.log("Profile step 2:", completeProfile);

    router.push("/profile/step-3");
  };

  const handleBack = () => {
    router.push("/profile");
  };

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
                    2
                  </div>
                  <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Paso 2 de 3
                  </span>
                </div>
                <span>•</span>
                <span>Información física</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '66%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Información Física</CardTitle>
                <CardDescription>
                  Completa tu perfil para obtener recomendaciones más precisas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-gray-500" />
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="border-2 focus:border-green-500"
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-gray-500" />
                  Altura (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  className="border-2 focus:border-green-500"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Edad
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="border-2 focus:border-green-500"
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  Género
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                  required
                >
                  <SelectTrigger id="gender" className="border-2 focus:border-green-500">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Femenino</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exercises" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-gray-500" />
                ¿Haces ejercicio?
              </Label>
              <Select
                value={formData.exercises}
                onValueChange={(value) =>
                  setFormData({ ...formData, exercises: value })
                }
                required
              >
                <SelectTrigger id="exercises" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.exercises === "yes" && (
              <div className="space-y-2">
                <Label htmlFor="exerciseFrequency">
                  ¿Cuántas veces por semana?
                </Label>
                <Select
                  value={formData.exerciseFrequency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, exerciseFrequency: value })
                  }
                  required
                >
                  <SelectTrigger id="exerciseFrequency" className="border-2 focus:border-green-500">
                    <SelectValue placeholder="Selecciona frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 veces</SelectItem>
                    <SelectItem value="3-4">3-4 veces</SelectItem>
                    <SelectItem value="5-6">5-6 veces</SelectItem>
                    <SelectItem value="7+">7+ veces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="activityLevel" className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                Nivel de actividad diaria
              </Label>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, activityLevel: value })
                }
                required
              >
                <SelectTrigger id="activityLevel" className="border-2 focus:border-green-500">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">
                    Sedentario (trabajo de oficina)
                  </SelectItem>
                  <SelectItem value="light">
                    Ligera (camino ocasionalmente)
                  </SelectItem>
                  <SelectItem value="moderate">
                    Moderada (trabajo activo)
                  </SelectItem>
                  <SelectItem value="active">
                    Activa (trabajo físico)
                  </SelectItem>
                  <SelectItem value="very-active">
                    Muy activa (atleta)
                  </SelectItem>
                </SelectContent>
              </Select>
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
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
