import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find - Imaginez, trouvez, regardez",
  description: "Votre imagination ouvre la porte à l'évasion cinématographique idéale. Dites adieu aux recherches, laissez-vous porter par l'inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
