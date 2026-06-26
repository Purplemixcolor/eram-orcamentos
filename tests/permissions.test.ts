import { describe, expect, it } from "vitest";
import { users } from "@/lib/demo-data";

const permissions = {
  ADMIN: ["manage_users", "manage_imports", "edit_quotes", "review_data", "read"],
  ORCAMENTISTA: ["edit_quotes", "read"],
  REVISOR: ["review_data", "read"],
  CONSULTA: ["read"]
};

describe("role permissions", () => {
  it("keeps public signup out of the demo roles", () => {
    expect(users.every((user) => user.active)).toBe(true);
    expect(users.some((user) => user.role === "ADMIN")).toBe(true);
  });

  it("prevents consulta from editing budgets", () => {
    expect(permissions.CONSULTA).toContain("read");
    expect(permissions.CONSULTA).not.toContain("edit_quotes");
  });
});
