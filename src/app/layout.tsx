import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./(root)/globals.css";
import { Providers } from "./(root)/providers";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import { dark } from "@clerk/themes";
export const metadata: Metadata = {
  title: "Nasa GPT",
  description: "Chat gpt trained on NASA Pdf's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en' className='dark'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
