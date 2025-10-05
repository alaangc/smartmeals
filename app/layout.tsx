import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SmartMeals - Planificación Inteligente de Comidas",
  description: "Crea planes de comidas personalizados que se adaptan a tu estilo de vida, objetivos y preferencias. Planifica tu semana completa con desayunos, almuerzos y cenas saludables.",
  keywords: ["planificación de comidas", "nutrición", "recetas saludables", "meal planning", "dieta personalizada"],
  authors: [{ name: "SmartMeals" }],
  creator: "SmartMeals",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://smartmeals.vercel.app",
    title: "SmartMeals - Planificación Inteligente de Comidas",
    description: "Crea planes de comidas personalizados que se adaptan a tu estilo de vida, objetivos y preferencias.",
    siteName: "SmartMeals",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartMeals - Planificación Inteligente de Comidas",
    description: "Crea planes de comidas personalizados que se adaptan a tu estilo de vida, objetivos y preferencias.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
