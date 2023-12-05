import type { Metadata } from "next";
import "@/app/styles/globals.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Provider from "@/utils/Provider";

export const metadata: Metadata = {
  title: "БАЙ ОРДО",
  description: "Created by switchinglanes",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Provider>
          <Header />
          <div className='flex justify-between'>
            <div className='hidden sm:block w-52'>
              <Sidebar />
            </div>
            <div className='flex-1 mt-20'>{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}