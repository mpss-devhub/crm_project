export interface PermissionTree {
  id: string;
  label: string;
  checked?: boolean;
  children?: PermissionTree[];
}
