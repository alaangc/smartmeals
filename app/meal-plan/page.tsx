"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, RefreshCw, Loader2, Sparkles, Clock, Flame } from "lucide-react";
import { Navbar } from "@/components/navbar";

type Meal = {
  day: string;
  mealType: string;
  name: string;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipe?: string;
  isFavorite?: boolean;
};

export default function MealPlanPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const mealTypes = ["Desayuno", "Almuerzo", "Cena"];

  const generateMealPlan = async () => {
    setLoading(true);

    // Get user profile from localStorage
    const profileStr = localStorage.getItem("userProfile");
    const profile = profileStr ? JSON.parse(profileStr) : {};

    const goal = profile.goal || "maintain";
    const allergies = profile.allergies || "";
    const dietaryPreference = profile.dietaryPreference || "omnivore";
    const exerciseFrequency = profile.exerciseFrequency || "none";
    const activityLevel = profile.activityLevel || "moderate";
    const budget = profile.budget || "moderado";
    const cookingSkill = profile.cookingSkill || "intermedio";
    const maxPrepTime = profile.maxPrepTime || "45";
    const foodDislikes = profile.foodDislikes || "";
    const cuisinePreferences = profile.cuisinePreferences || [];

    console.log("Generating meals with complete profile:", {
      goal,
      allergies,
      dietaryPreference,
      exerciseFrequency,
      activityLevel,
      budget,
      cookingSkill,
      maxPrepTime,
      foodDislikes,
      cuisinePreferences,
      weight: profile.weight,
      age: profile.age,
    });

    // Simulate loading delay and generate meals based on profile
    setTimeout(() => {
      let mockMeals: Meal[] = [];

      // Generate meals based on goal
      if (goal === "lose-weight") {
        mockMeals = [
          // Lunes - Bajas calorías, alto en proteína
          { day: "Lunes", mealType: "Desayuno", name: "Claras de huevo con espinaca y tomate", prepTime: "15 min", calories: 180, protein: 45, carbs: 35, fat: 20, recipe: "INGREDIENTES:\n• 4-5 claras de huevo\n• 1 taza (30g) de espinaca fresca\n• 5-6 tomates cherry\n• Spray antiadherente\n• Sal y pimienta al gusto\n• 1/4 cucharadita de ajo en polvo\n\nPREPARACIÓN:\n1. Separa las claras de huevo y bátelas ligeramente.\n2. Calienta una sartén con spray antiadherente a fuego medio.\n3. Saltea la espinaca fresca hasta que se marchite (2 min).\n4. Agrega las claras batidas y cocina revolviendo hasta que cuajen.\n5. Corta los tomates cherry por la mitad y agrega al plato.\n6. Sazona con sal, pimienta y ajo en polvo al servir." },
          { day: "Lunes", mealType: "Almuerzo", name: "Ensalada de pollo a la parrilla con limón", prepTime: "20 min", calories: 350, protein: 50, carbs: 25, fat: 25, recipe: "INGREDIENTES:\n• 150g de pechuga de pollo\n• 2 tazas (100g) de lechuga mixta\n• 1/2 pepino (80g)\n• 8-10 tomates cherry\n• 1/4 cebolla morada (30g)\n• 1 limón (jugo)\n• 1 cucharada (15ml) de aceite de oliva\n• Sal, pimienta y hierbas frescas al gusto\n\nPREPARACIÓN:\n1. Sazona la pechuga de pollo con jugo de limón, sal y pimienta.\n2. Calienta una parrilla o sartén a fuego medio-alto.\n3. Cocina el pollo 6-7 minutos por cada lado.\n4. Corta la lechuga, pepino en rodajas, tomates por la mitad y cebolla en juliana.\n5. Mezcla todos los vegetales en un bowl.\n6. Corta el pollo en tiras y coloca sobre la ensalada.\n7. Aliña con el resto del jugo de limón, aceite de oliva y hierbas frescas." },
          { day: "Lunes", mealType: "Cena", name: "Pescado al vapor con brócoli", prepTime: "25 min", calories: 280, protein: 55, carbs: 20, fat: 25, recipe: "INGREDIENTES:\n• 150g de filete de pescado blanco (tilapia, merluza o similar)\n• 1 taza (150g) de brócoli\n• 1/2 limón (jugo)\n• 1 cucharada (15ml) de aceite de oliva\n• 2 dientes de ajo picados\n• Sal y pimienta al gusto\n• Perejil fresco (opcional)\n\nPREPARACIÓN:\n1. Lava y corta el brócoli en floretes pequeños.\n2. Coloca agua en una vaporera y lleva a ebullición.\n3. Sazona el filete de pescado con sal, pimienta y jugo de limón.\n4. Coloca el pescado en la vaporera y cocina 10-12 minutos.\n5. A los 5 minutos de cocción del pescado, agrega el brócoli a la vaporera.\n6. Cocina hasta que ambos estén tiernos.\n7. Sirve el pescado con el brócoli, rocía con aceite de oliva y ajo picado.\n8. Decora con perejil fresco si lo deseas." },
          // Martes
          { day: "Martes", mealType: "Desayuno", name: "Yogurt griego natural con frutos rojos", prepTime: "5 min", calories: 200, protein: 40, carbs: 45, fat: 15 },
          { day: "Martes", mealType: "Almuerzo", name: "Pechuga de pavo con ensalada verde", prepTime: "20 min", calories: 320, protein: 48, carbs: 28, fat: 24 },
          { day: "Martes", mealType: "Cena", name: "Sopa de verduras con pollo desmenuzado", prepTime: "30 min", calories: 250, protein: 45, carbs: 35, fat: 20 },
          // Miércoles
          { day: "Miércoles", mealType: "Desayuno", name: "Smoothie verde con proteína", prepTime: "10 min", calories: 220, protein: 42, carbs: 38, fat: 20 },
          { day: "Miércoles", mealType: "Almuerzo", name: "Atún con ensalada de pepino", prepTime: "15 min", calories: 300, protein: 52, carbs: 22, fat: 26 },
          { day: "Miércoles", mealType: "Cena", name: "Pollo al horno con espárragos", prepTime: "35 min", calories: 310, protein: 50, carbs: 25, fat: 25 },
          // Jueves
          { day: "Jueves", mealType: "Desayuno", name: "Tortilla de claras con champiñones", prepTime: "15 min", calories: 160, protein: 48, carbs: 32, fat: 20 },
          { day: "Jueves", mealType: "Almuerzo", name: "Ensalada de camarones con aguacate", prepTime: "20 min", calories: 380, protein: 45, carbs: 25, fat: 30 },
          { day: "Jueves", mealType: "Cena", name: "Salmón a la plancha con verduras", prepTime: "25 min", calories: 340, protein: 50, carbs: 20, fat: 30 },
          // Viernes
          { day: "Viernes", mealType: "Desayuno", name: "Avena con canela y manzana", prepTime: "10 min", calories: 240, protein: 25, carbs: 55, fat: 20 },
          { day: "Viernes", mealType: "Almuerzo", name: "Pechuga de pollo con quinoa y vegetales", prepTime: "30 min", calories: 420, protein: 45, carbs: 35, fat: 20 },
          { day: "Viernes", mealType: "Cena", name: "Caldo de pollo con verduras", prepTime: "35 min", calories: 180, protein: 50, carbs: 30, fat: 20 },
          // Sábado
          { day: "Sábado", mealType: "Desayuno", name: "Tostada integral con aguacate", prepTime: "10 min", calories: 280, protein: 25, carbs: 45, fat: 30 },
          { day: "Sábado", mealType: "Almuerzo", name: "Ensalada mediterránea con atún", prepTime: "20 min", calories: 360, protein: 48, carbs: 28, fat: 24 },
          { day: "Sábado", mealType: "Cena", name: "Pavo molido con calabacín en espiral", prepTime: "30 min", calories: 290, protein: 52, carbs: 24, fat: 24 },
          // Domingo
          { day: "Domingo", mealType: "Desayuno", name: "Huevos revueltos con espinaca", prepTime: "15 min", calories: 210, protein: 45, carbs: 30, fat: 25 },
          { day: "Domingo", mealType: "Almuerzo", name: "Filete de pescado con ensalada", prepTime: "25 min", calories: 330, protein: 50, carbs: 25, fat: 25 },
          { day: "Domingo", mealType: "Cena", name: "Pollo al limón con coliflor", prepTime: "30 min", calories: 300, protein: 48, carbs: 28, fat: 24 },
        ];
      } else if (goal === "gain-muscle") {
        mockMeals = [
          // Lunes - Alto en proteína y carbohidratos
          { day: "Lunes", mealType: "Desayuno", name: "Avena con proteína, plátano y mantequilla de maní", prepTime: "15 min", calories: 520, protein: 45, carbs: 50, fat: 25 },
          { day: "Lunes", mealType: "Almuerzo", name: "Pechuga de pollo con arroz integral y brócoli", prepTime: "35 min", calories: 650, protein: 55, carbs: 60, fat: 20 },
          { day: "Lunes", mealType: "Cena", name: "Salmón con batata asada y espinacas", prepTime: "40 min", calories: 580, protein: 50, carbs: 45, fat: 30 },
          // Martes
          { day: "Martes", mealType: "Desayuno", name: "Huevos enteros con tostadas y aguacate", prepTime: "15 min", calories: 480, protein: 40, carbs: 35, fat: 30 },
          { day: "Martes", mealType: "Almuerzo", name: "Carne de res magra con pasta integral", prepTime: "35 min", calories: 720, protein: 50, carbs: 65, fat: 25 },
          { day: "Martes", mealType: "Cena", name: "Atún con quinoa y vegetales asados", prepTime: "30 min", calories: 550, protein: 55, carbs: 40, fat: 20 },
          // Miércoles
          { day: "Miércoles", mealType: "Desayuno", name: "Panqueques de proteína con frutos rojos", prepTime: "20 min", calories: 500, protein: 45, carbs: 45, fat: 25 },
          { day: "Miércoles", mealType: "Almuerzo", name: "Pollo al horno con arroz blanco y frijoles", prepTime: "40 min", calories: 680, protein: 50, carbs: 70, fat: 20 },
          { day: "Miércoles", mealType: "Cena", name: "Bistec con papa al horno y ensalada", prepTime: "35 min", calories: 620, protein: 55, carbs: 45, fat: 30 },
          // Jueves
          { day: "Jueves", mealType: "Desayuno", name: "Yogurt griego con granola y miel", prepTime: "5 min", calories: 420, protein: 35, carbs: 50, fat: 20 },
          { day: "Jueves", mealType: "Almuerzo", name: "Pavo molido con arroz y verduras", prepTime: "30 min", calories: 590, protein: 50, carbs: 55, fat: 25 },
          { day: "Jueves", mealType: "Cena", name: "Salmón con puré de batata", prepTime: "35 min", calories: 540, protein: 45, carbs: 50, fat: 25 },
          // Viernes
          { day: "Viernes", mealType: "Desayuno", name: "Tostadas con huevo y jamón de pavo", prepTime: "15 min", calories: 450, protein: 40, carbs: 40, fat: 25 },
          { day: "Viernes", mealType: "Almuerzo", name: "Pollo a la parrilla con pasta y pesto", prepTime: "35 min", calories: 700, protein: 45, carbs: 65, fat: 30 },
          { day: "Viernes", mealType: "Cena", name: "Carne molida con arroz y frijoles negros", prepTime: "35 min", calories: 640, protein: 50, carbs: 60, fat: 25 },
          // Sábado
          { day: "Sábado", mealType: "Desayuno", name: "Omelette de 4 huevos con queso y vegetales", prepTime: "20 min", calories: 550, protein: 50, carbs: 25, fat: 35 },
          { day: "Sábado", mealType: "Almuerzo", name: "Pollo con arroz frito y vegetales", prepTime: "30 min", calories: 670, protein: 45, carbs: 70, fat: 20 },
          { day: "Sábado", mealType: "Cena", name: "Filete de res con papa y ensalada", prepTime: "40 min", calories: 610, protein: 50, carbs: 45, fat: 30 },
          // Domingo
          { day: "Domingo", mealType: "Desayuno", name: "Pancakes proteicos con jarabe de maple", prepTime: "25 min", calories: 530, protein: 40, carbs: 50, fat: 25 },
          { day: "Domingo", mealType: "Almuerzo", name: "Pollo al horno con quinoa y aguacate", prepTime: "40 min", calories: 690, protein: 50, carbs: 60, fat: 25 },
          { day: "Domingo", mealType: "Cena", name: "Salmón con arroz integral y brócoli", prepTime: "35 min", calories: 580, protein: 50, carbs: 45, fat: 25 },
        ];
      } else if (goal === "recomposition") {
        mockMeals = [
          // Lunes - Balance de macros
          { day: "Lunes", mealType: "Desayuno", name: "Huevos revueltos con avena y fresas", prepTime: "15 min", calories: 380, protein: 40, carbs: 35, fat: 25 },
          { day: "Lunes", mealType: "Almuerzo", name: "Pollo con arroz integral y verduras salteadas", prepTime: "30 min", calories: 520, protein: 45, carbs: 50, fat: 20 },
          { day: "Lunes", mealType: "Cena", name: "Pescado con quinoa y espárragos", prepTime: "30 min", calories: 450, protein: 50, carbs: 40, fat: 25 },
          // Martes
          { day: "Martes", mealType: "Desayuno", name: "Tostadas integrales con aguacate y huevo", prepTime: "15 min", calories: 400, protein: 35, carbs: 40, fat: 30 },
          { day: "Martes", mealType: "Almuerzo", name: "Pavo con batata y ensalada", prepTime: "30 min", calories: 480, protein: 40, carbs: 45, fat: 25 },
          { day: "Martes", mealType: "Cena", name: "Salmón con coliflor rostizada", prepTime: "30 min", calories: 420, protein: 45, carbs: 35, fat: 25 },
          // Miércoles
          { day: "Miércoles", mealType: "Desayuno", name: "Smoothie bowl con proteína y frutas", prepTime: "10 min", calories: 350, protein: 35, carbs: 40, fat: 20 },
          { day: "Miércoles", mealType: "Almuerzo", name: "Atún con pasta integral y tomate", prepTime: "25 min", calories: 510, protein: 45, carbs: 50, fat: 20 },
          { day: "Miércoles", mealType: "Cena", name: "Pollo al curry con arroz basmati", prepTime: "40 min", calories: 540, protein: 40, carbs: 55, fat: 25 },
          // Jueves
          { day: "Jueves", mealType: "Desayuno", name: "Yogurt griego con avena y nueces", prepTime: "5 min", calories: 370, protein: 30, carbs: 45, fat: 25 },
          { day: "Jueves", mealType: "Almuerzo", name: "Ensalada de pollo con garbanzos", prepTime: "20 min", calories: 460, protein: 40, carbs: 40, fat: 25 },
          { day: "Jueves", mealType: "Cena", name: "Filete de pescado con papa al horno", prepTime: "35 min", calories: 490, protein: 45, carbs: 45, fat: 25 },
          // Viernes
          { day: "Viernes", mealType: "Desayuno", name: "Tortilla de vegetales con pan integral", prepTime: "15 min", calories: 360, protein: 30, carbs: 40, fat: 25 },
          { day: "Viernes", mealType: "Almuerzo", name: "Bowl de quinoa con pollo y aguacate", prepTime: "25 min", calories: 530, protein: 45, carbs: 50, fat: 25 },
          { day: "Viernes", mealType: "Cena", name: "Camarones con fideos de calabacín", prepTime: "25 min", calories: 410, protein: 40, carbs: 35, fat: 25 },
          // Sábado
          { day: "Sábado", mealType: "Desayuno", name: "Huevos benedictinos con espinaca", prepTime: "25 min", calories: 420, protein: 35, carbs: 35, fat: 30 },
          { day: "Sábado", mealType: "Almuerzo", name: "Pollo con arroz y frijoles negros", prepTime: "35 min", calories: 550, protein: 45, carbs: 55, fat: 20 },
          { day: "Sábado", mealType: "Cena", name: "Salmón con ensalada mixta", prepTime: "25 min", calories: 440, protein: 45, carbs: 35, fat: 25 },
          // Domingo
          { day: "Domingo", mealType: "Desayuno", name: "Avena proteica con plátano", prepTime: "15 min", calories: 390, protein: 35, carbs: 45, fat: 20 },
          { day: "Domingo", mealType: "Almuerzo", name: "Pechuga de pollo con vegetales asados", prepTime: "40 min", calories: 500, protein: 45, carbs: 45, fat: 25 },
          { day: "Domingo", mealType: "Cena", name: "Atún sellado con quinoa", prepTime: "30 min", calories: 470, protein: 50, carbs: 40, fat: 20 },
        ];
      } else {
        // maintain weight - balanced meals
        mockMeals = [
          // Lunes
          { day: "Lunes", mealType: "Desayuno", name: "Avena con frutas y nueces", prepTime: "15 min", calories: 340, protein: 25, carbs: 45, fat: 20 },
          { day: "Lunes", mealType: "Almuerzo", name: "Ensalada de pollo con aguacate", prepTime: "25 min", calories: 450, protein: 40, carbs: 30, fat: 30 },
          { day: "Lunes", mealType: "Cena", name: "Salmón al horno con verduras", prepTime: "35 min", calories: 480, protein: 45, carbs: 35, fat: 25 },
          // Martes
          { day: "Martes", mealType: "Desayuno", name: "Tostadas integrales con huevo revuelto", prepTime: "10 min", calories: 310, protein: 30, carbs: 40, fat: 20 },
          { day: "Martes", mealType: "Almuerzo", name: "Pasta con verduras salteadas", prepTime: "30 min", calories: 520, protein: 25, carbs: 60, fat: 20 },
          { day: "Martes", mealType: "Cena", name: "Tacos de pescado con col morada", prepTime: "25 min", calories: 420, protein: 35, carbs: 40, fat: 25 },
          // Miércoles
          { day: "Miércoles", mealType: "Desayuno", name: "Smoothie de plátano y espinaca", prepTime: "10 min", calories: 290, protein: 20, carbs: 45, fat: 15 },
          { day: "Miércoles", mealType: "Almuerzo", name: "Arroz frito con pollo y vegetales", prepTime: "30 min", calories: 540, protein: 35, carbs: 60, fat: 20 },
          { day: "Miércoles", mealType: "Cena", name: "Sopa de lentejas con pan integral", prepTime: "40 min", calories: 380, protein: 30, carbs: 50, fat: 15 },
          // Jueves
          { day: "Jueves", mealType: "Desayuno", name: "Yogurt griego con granola y miel", prepTime: "5 min", calories: 350, protein: 25, carbs: 50, fat: 20 },
          { day: "Jueves", mealType: "Almuerzo", name: "Wrap de pavo con vegetales frescos", prepTime: "15 min", calories: 410, protein: 35, carbs: 40, fat: 20 },
          { day: "Jueves", mealType: "Cena", name: "Pollo al curry con arroz basmati", prepTime: "45 min", calories: 510, protein: 40, carbs: 55, fat: 20 },
          // Viernes
          { day: "Viernes", mealType: "Desayuno", name: "Panqueques de avena con moras", prepTime: "20 min", calories: 380, protein: 25, carbs: 50, fat: 20 },
          { day: "Viernes", mealType: "Almuerzo", name: "Bowl de quinoa con garbanzos", prepTime: "25 min", calories: 460, protein: 30, carbs: 55, fat: 20 },
          { day: "Viernes", mealType: "Cena", name: "Pizza casera de vegetales", prepTime: "40 min", calories: 550, protein: 25, carbs: 60, fat: 25 },
          // Sábado
          { day: "Sábado", mealType: "Desayuno", name: "Huevos benedictinos con espinaca", prepTime: "30 min", calories: 420, protein: 35, carbs: 35, fat: 30 },
          { day: "Sábado", mealType: "Almuerzo", name: "Hamburguesas de lentejas", prepTime: "35 min", calories: 480, protein: 30, carbs: 50, fat: 25 },
          { day: "Sábado", mealType: "Cena", name: "Paella de mariscos", prepTime: "50 min", calories: 580, protein: 35, carbs: 60, fat: 25 },
          // Domingo
          { day: "Domingo", mealType: "Desayuno", name: "French toast con fresas", prepTime: "20 min", calories: 390, protein: 25, carbs: 45, fat: 25 },
          { day: "Domingo", mealType: "Almuerzo", name: "Lasaña de vegetales", prepTime: "60 min", calories: 520, protein: 30, carbs: 55, fat: 25 },
          { day: "Domingo", mealType: "Cena", name: "Ensalada César con camarones", prepTime: "20 min", calories: 410, protein: 35, carbs: 30, fat: 25 },
        ];
      }

      // Filter out meals with allergens and dislikes (simple keyword matching)
      const filterKeywords: string[] = [];
      if (allergies) {
        filterKeywords.push(...allergies.toLowerCase().split(',').map((a: string) => a.trim()));
      }
      if (foodDislikes) {
        filterKeywords.push(...foodDislikes.toLowerCase().split(',').map((a: string) => a.trim()));
      }

      if (filterKeywords.length > 0) {
        mockMeals = mockMeals.filter(meal => {
          const mealLower = meal.name.toLowerCase();
          return !filterKeywords.some(keyword => mealLower.includes(keyword));
        });

        // If too many meals were filtered out, show a message
        if (mockMeals.length < 21) {
          console.log(`Algunas comidas fueron filtradas debido a alergias/preferencias. ${mockMeals.length} comidas generadas.`);
        }
      }

      // Filter by max prep time
      if (maxPrepTime !== "60+") {
        const maxTime = parseInt(maxPrepTime);
        mockMeals = mockMeals.filter(meal => {
          const prepTimeMatch = meal.prepTime.match(/\d+/);
          if (prepTimeMatch) {
            const mealTime = parseInt(prepTimeMatch[0]);
            return mealTime <= maxTime;
          }
          return true;
        });
      }

      // Add default macros and recipe to any meals that don't have them
      setMeals(mockMeals.map(meal => ({
        ...meal,
        isFavorite: false,
        protein: meal.protein || 40,
        carbs: meal.carbs || 35,
        fat: meal.fat || 25,
        recipe: meal.recipe || `INGREDIENTES:\n• Ingredientes principales del platillo\n• Cantidades según porciones necesarias\n• Condimentos y especias al gusto\n\nPREPARACIÓN:\n1. Prepara y lava todos los ingredientes frescos.\n2. Sigue técnicas de cocción saludables (al horno, vapor, parrilla).\n3. Controla las porciones según tus objetivos nutricionales.\n4. Sazona con hierbas y especias naturales.\n5. Sirve inmediatamente para mejor sabor.\n\n💡 Nota: Esta es una receta genérica para ${meal.name}. Las medidas específicas se ajustarán según tus necesidades calóricas. Consulta con un nutricionista para recetas personalizadas y cantidades exactas.`
      })));
      setLoading(false);
    }, 1500);
  };

  const toggleFavorite = (index: number) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal, i) =>
        i === index ? { ...meal, isFavorite: !meal.isFavorite } : meal
      )
    );
  };

  const regenerateMeal = async (index: number) => {
    // For now, just show a placeholder - full regeneration would need a separate API call
    console.log(`Regenerating meal at index ${index}`);
    alert("Funcionalidad de regenerar comida individual próximamente");
  };

  const getMealsForDayAndType = (day: string, mealType: string) => {
    const mealIndex = meals.findIndex(
      (m) => m.day === day && m.mealType === mealType
    );
    return mealIndex >= 0 ? { meal: meals[mealIndex], index: mealIndex } : null;
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Planificador Semanal de Comidas
                </h1>
                <p className="text-gray-600">
                  Genera un plan de comidas personalizado para toda la semana
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Button
              onClick={generateMealPlan}
              disabled={loading}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generando tu plan perfecto...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generar Plan de Comidas
                </>
              )}
            </Button>
          </div>

        {meals.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {days.map((day) => (
              <div key={day} className="space-y-3">
                <div className="sticky top-20 bg-gradient-to-br from-green-50 via-white to-blue-50 py-3 z-10">
                  <h2 className="font-bold text-lg text-gray-900 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                    {day}
                  </h2>
                </div>
                {mealTypes.map((mealType) => {
                  const result = getMealsForDayAndType(day, mealType);
                  if (!result) return null;
                  const { meal, index } = result;

                  return (
                    <Card
                      key={`${day}-${mealType}`}
                      className="hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer bg-white border-2 border-transparent hover:border-green-200"
                      onClick={() => setSelectedMeal(meal)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              meal.mealType === "Desayuno"
                                ? "bg-orange-100 text-orange-700"
                                : meal.mealType === "Almuerzo"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {meal.mealType}
                          </Badge>
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(index);
                              }}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Marcar como favorito"
                            >
                              <Heart
                                className={`h-4 w-4 transition-all ${
                                  meal.isFavorite
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-gray-400 hover:text-red-400"
                                }`}
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                regenerateMeal(index);
                              }}
                              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                              aria-label="Regenerar comida"
                            >
                              <RefreshCw className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2">
                            {meal.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{meal.prepTime}</span>
                          </div>
                          <div className="flex items-center gap-1 font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            <Flame className="h-3.5 w-3.5 text-orange-500" />
                            <span>{meal.calories} kcal</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {meals.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¡Comienza tu plan de comidas!
              </h3>
              <p className="text-gray-600">
                Haz clic en el botón de arriba para generar tu plan personalizado de comidas para toda la semana
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

      <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
        <DialogContent className="max-w-md">
          {selectedMeal && (
            <div>
              <DialogHeader>
                <DialogTitle>{selectedMeal.name}</DialogTitle>
                <DialogDescription>
                  {selectedMeal.mealType} • {selectedMeal.day}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calorías</span>
                  <span className="font-semibold text-lg text-blue-600">
                    {selectedMeal.calories} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tiempo de preparación</span>
                  <span className="font-medium">⏱️ {selectedMeal.prepTime}</span>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold text-sm">Macronutrientes</h4>

                  {/* Protein Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Proteína</span>
                      <span className="font-semibold">{selectedMeal.protein}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedMeal.protein}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Carbs Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Carbohidratos</span>
                      <span className="font-semibold">{selectedMeal.carbs}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedMeal.carbs}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Fat Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Grasas</span>
                      <span className="font-semibold">{selectedMeal.fat}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedMeal.fat}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Recipe Section */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-semibold text-sm">Receta</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed max-h-64 overflow-y-auto">
                    {selectedMeal.recipe}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
