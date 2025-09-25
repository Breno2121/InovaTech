import NavBar from "@/components/NavBar";
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <NavBar />
    {children}
    </div>;
}
