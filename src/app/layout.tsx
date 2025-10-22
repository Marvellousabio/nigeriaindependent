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
  title: "Nigeria Independent - Discover Nigeria's Culture & Heritage",
  description: "Explore Nigeria's rich history, culture, food, music, and traditions through immersive AI-powered experiences and virtual tours.",
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
