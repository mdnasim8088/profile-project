import { isAuthenticated, isPasswordConfigured } from "@/lib/admin/auth";
import { AdminApp } from "@/components/admin/AdminApp";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminPage() {
  if (!(await isAuthenticated())) return <LoginForm configured={isPasswordConfigured()} />;
  return <AdminApp />;
}
