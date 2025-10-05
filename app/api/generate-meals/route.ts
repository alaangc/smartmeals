export async function POST() {
  console.log("Generate meals API route hit");

  const mockMeals = {
    meals: [
      {
        day: "Lunes",
        mealType: "Desayuno",
        name: "Avena con frutas y nueces",
        prepTime: "15 min"
      },
      {
        day: "Lunes",
        mealType: "Almuerzo",
        name: "Ensalada de pollo a la parrilla",
        prepTime: "30 min"
      },
      {
        day: "Lunes",
        mealType: "Cena",
        name: "Salmón al horno con vegetales",
        prepTime: "40 min"
      },
      {
        day: "Martes",
        mealType: "Desayuno",
        name: "Huevos revueltos con tostadas",
        prepTime: "20 min"
      },
      {
        day: "Martes",
        mealType: "Almuerzo",
        name: "Sándwich de pavo con ensalada",
        prepTime: "15 min"
      },
      {
        day: "Martes",
        mealType: "Cena",
        name: "Pasta primavera con vegetales",
        prepTime: "35 min"
      },
      {
        day: "Miércoles",
        mealType: "Desayuno",
        name: "Yogurt con granola y miel",
        prepTime: "10 min"
      },
      {
        day: "Miércoles",
        mealType: "Almuerzo",
        name: "Tacos de pescado con guacamole",
        prepTime: "25 min"
      },
      {
        day: "Miércoles",
        mealType: "Cena",
        name: "Pollo al curry con arroz",
        prepTime: "45 min"
      },
      {
        day: "Jueves",
        mealType: "Desayuno",
        name: "Smoothie bowl con frutas frescas",
        prepTime: "15 min"
      },
      {
        day: "Jueves",
        mealType: "Almuerzo",
        name: "Sopa de lentejas con pan integral",
        prepTime: "40 min"
      },
      {
        day: "Jueves",
        mealType: "Cena",
        name: "Bistec con papas asadas",
        prepTime: "50 min"
      },
      {
        day: "Viernes",
        mealType: "Desayuno",
        name: "Panqueques con miel de maple",
        prepTime: "25 min"
      },
      {
        day: "Viernes",
        mealType: "Almuerzo",
        name: "Burrito bowl vegetariano",
        prepTime: "20 min"
      },
      {
        day: "Viernes",
        mealType: "Cena",
        name: "Pizza casera con ensalada",
        prepTime: "60 min"
      },
      {
        day: "Sábado",
        mealType: "Desayuno",
        name: "Tostadas francesas con frutas",
        prepTime: "20 min"
      },
      {
        day: "Sábado",
        mealType: "Almuerzo",
        name: "Hamburguesa con papas fritas",
        prepTime: "30 min"
      },
      {
        day: "Sábado",
        mealType: "Cena",
        name: "Paella de mariscos",
        prepTime: "55 min"
      },
      {
        day: "Domingo",
        mealType: "Desayuno",
        name: "Omelette con queso y vegetales",
        prepTime: "20 min"
      },
      {
        day: "Domingo",
        mealType: "Almuerzo",
        name: "Pollo asado con ensalada césar",
        prepTime: "45 min"
      },
      {
        day: "Domingo",
        mealType: "Cena",
        name: "Lasaña de carne con pan de ajo",
        prepTime: "60 min"
      }
    ]
  };

  return Response.json(mockMeals);
}
