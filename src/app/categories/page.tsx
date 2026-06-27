import { AppShell } from "@/components/layout/app-shell";
import { CategoriesManager } from "@/features/categories/categories-manager";

export default function CategoriesPage() {
  return (
    <AppShell>
      <CategoriesManager />
    </AppShell>
  );
}
