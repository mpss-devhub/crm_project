import { get, UserGroup } from "@/lib/usergroups";
import UserGroupList from "./UserGroupList";

export default async function UserGroupListPage() {
  const data: UserGroup[] = await get();
  return <UserGroupList data={data} />;
}
