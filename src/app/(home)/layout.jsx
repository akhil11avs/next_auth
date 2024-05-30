import DashboardLayout from "@/DashboardLayout";

export default function RootLayout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
