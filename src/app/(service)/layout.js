import Navbar from "@/components/NavBar";
import { ToastProvider } from "@/components/ui/use-toast"


export const metadata = {
  title: "Library Hell",
  description: "Together we die",
};

export default function RootLayout({ children }) {
  return (
      <section className="min-h-screen bg-gray-100">
        <Navbar />
        <ToastProvider>{children}</ToastProvider>
     </section>
  );
}
