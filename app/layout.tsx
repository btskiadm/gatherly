import { ApplicationNavBar } from "./common/components/ApplicationNavBar";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";

const roboto = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html>
      <body className={roboto.variable}>
        <Providers>
          <ApplicationNavBar />
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
