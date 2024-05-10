import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ToastProvider from "./providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Forget password app",
  description: "A simple forget password project for practicing!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-6`}>
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
