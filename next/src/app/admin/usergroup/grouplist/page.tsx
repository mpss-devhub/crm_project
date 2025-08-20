// 'use client'
// import { UserGroup } from '@/types/usergroup';
// import { get } from "@/server/usergroups";
// import { useEffect, useState } from 'react';
// import Layout from "@/components/Layout";
// import Button from 'components/Button';
// import { FaUserPlus } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { Table, ColumnDefinition } from '@/components/Table';
// import { Label } from '@/components/label';
// import InputBox from '@/components/InputBox';
// import SelectBox from '@/components/selectBox';


// interface UserGroup {
//   usergp_id: string;
//   name: string;
//   system_type: string;
//   description: string;
//   permission: string;
// }
// export default async function UserGroupListPage() {
//    const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
//   const [loading, setLoading] = useState(true);

//   const columns: ColumnDefinition<UserGroup>[] = [
//     {
//       key: 'usergp_id',
//       header: 'User Group ID',
//       sortable: true,
//     },
//     {
//       key: 'name',
//       header: 'Name',
//       sortable: true,
//     },
//     {
//       key: 'system_type',
//       header: 'System Type',
//       sortable: true,
//     },
//     {
//       key: 'description',
//       header: 'Description',
//       sortable: false,
//     }
//   ];

//   useEffect(() => {
//     async function fetchUserGroups() {
//       try {
//         const data = await get();
//         setUserGroups(data);
//       } catch (error) {
//         console.error('Failed to fetch user groups', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserGroups();
//   }, []);

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">User Groups</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Table<UserGroup>
//           columns={columns}
//           data={userGroups}
//           itemsPerPage={5}
//           className="mt-4"
//         />
//       )}
//     </Layout>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page