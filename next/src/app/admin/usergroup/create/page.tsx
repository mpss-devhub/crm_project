import { get } from "@/lib/permission";
import UserGroupCreateForm from "./UserGroupCreateForm";

interface PermissionTree {
  id: string;
  label: string;
  checked?: boolean;
  children?: PermissionTree[];
}

export default async function UserGroupCreatePage() {
  const data: Record<string, string[]> = await get();
  console.log(data);

  const permissions: PermissionTree[] = Object.entries(data).map(
    ([group, perms]) => ({
      id: group,
      label: group.replace(/_/g, " "),
      checked: false,
      children: perms.map((perm) => ({
        id: perm,
        label: perm.replace(/_/g, " "),
        checked: false,
      })),
    })
  );

  return <UserGroupCreateForm permissions={permissions} />;
}
