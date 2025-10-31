import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nigeria Independent - Experience Nigeria’s Culture with AI",
  description:
    "Explore Nigeria's rich history, culture, food, music, and traditions through immersive AI-powered experiences and virtual tours. Celebrate Nigeria’s diversity with modern technology.",
  verification: {
    google: "VJpH6uVApXWoOXsaOkDFxUs7v5Ac3YhtidZnvLZlTb8",
  },
  keywords:
    "Nigeria tourism, Nigerian culture, travel Nigeria, Nigerian heritage, AI tours, virtual Nigeria, explore Africa, Nigerian music, Nigerian food, Nigerian history",
  authors: [{ name: "Nigeria Independent" }],
  openGraph: {
    title:
      "Nigeria Independent - Discover Nigeria's Culture & Heritage | Explore with AI",
    description:
      "Immerse yourself in Nigeria’s diverse culture, music, food, and art through interactive AI experiences and virtual journeys.",
    type: "website",
    url: "https://nigeriaindependent.vercel.app", // Replace with your actual site URL
    siteName: "Nigeria Independent",
  },
  alternates: {
    canonical: "https://nigeriaindependent.vercel.app", // canonical tag fix
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get theme from cookies for SSR
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value as 'light' | 'dark' | undefined;

  return (
    <html lang="en" className={theme || 'light'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider initialTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
