import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Paguei?",
  description: ":D",
};

export const viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers
          props={{
            enableSystem: true,
            storageKey: "theme",
            defaultTheme: "system",
            attribute: "class",
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
