
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}) {
  return (
      <html lang="en">
        <body className={font.className}>
          <main>{children}</main>
        </body>
      </html>
  );
}