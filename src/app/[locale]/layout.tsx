import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/utilities/CartContext/CartContext";

// Local fonts
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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <UserProvider>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              <Navbar />
              {children}
              <Footer />
            </body>
          </NextIntlClientProvider>
        </CartProvider>
      </UserProvider>
    </html>
  );
}
