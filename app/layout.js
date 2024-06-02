import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import UserContextProivder from "../context/UserContextProvider";
import ApolloClientProvider from "../ApolloClientProvider/createApolloClient";
import AuthProvider from "./utils/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "MedHub",
  description: "This is very useful for the needy people",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <ApolloClientProvider>
        <body className={inter.className}>
          <AuthProvider session={session}>
            <UserContextProivder>
              <Navbar />
              {children}
            </UserContextProivder>
          </AuthProvider>
        </body>
      </ApolloClientProvider>
    </html>
  );
}
