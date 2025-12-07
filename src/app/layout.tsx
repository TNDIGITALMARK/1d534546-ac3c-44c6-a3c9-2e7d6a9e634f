import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ZyloProvider } from "@/lib/zylo/provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Elegant serif font for headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Clean sans-serif for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodExpress India | Order Food Online from Restaurants Near You",
  description: "Discover and order from thousands of restaurants across India. Fast delivery, amazing deals, and authentic local cuisines. Order now from Mumbai, Delhi, Bangalore, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

      
        {/* PHOENIX_EDITOR_INJECTION_START */}
        {(process.env.NODE_ENV === 'development' ||
          process.env.NEXT_PUBLIC_ENABLE_PHOENIX_EDITOR === 'true') && (
          <>
            <link rel="stylesheet" href="/phoenix-editor/helper.css?v=1765121967107" />
            <script
              src="/phoenix-editor/sourceMapTracker.js?v=1765121967107"
              data-phoenix-sourcemap="true"
              defer
            />
            <script
              src="/phoenix-editor/helper.js?v=1765121967107"
              data-phoenix-enabled="true"
              defer
            />
            <script
              src="/phoenix-editor/visualEditExtension.js?v=1765121967107"
              data-phoenix-visual-edit="true"
              defer
            />
            <script
              src="/phoenix-editor/contextIntegration.js?v=1765121967107"
              data-phoenix-context="true"
              defer
            />
            <script
              src="/phoenix-editor/inlineTextEditor.js?v=1765121967107"
              data-phoenix-text-edit="true"
              defer
            />
            <script
              src="/phoenix-editor/inlineClassEditor.js?v=1765121967107"
              data-phoenix-class-edit="true"
              defer
            />
          </>
        )}
        {/* PHOENIX_EDITOR_INJECTION_END */}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <QueryProvider>
          <ZyloProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </ThemeProvider>
          </ZyloProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
