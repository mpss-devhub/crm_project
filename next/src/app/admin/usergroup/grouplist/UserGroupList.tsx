'use client';

import { useState } from "react";
import Layout from "@/components/Layout";
import { FaRegEdit } from "react-icons/fa";
import { Table, ColumnDefinition } from "@/components/Table";
import Link from "next/link";
import { UserGroup } from "@/lib/usergroups";

interface UserGroupListProps {
  data: UserGroup[];
}

export default function UserGroupList({ data }: UserGroupListProps) {
  const [userGroups, setUserGroups] = useState<UserGroup[]>(data);
  const [currentUserGroup, setCurrentUserGroup] = useState<UserGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (userGroup: UserGroup) => {
    setCurrentUserGroup(userGroup);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserGroup) return;

    setUserGroups(userGroups.map(g =>
      g.usergp_id === currentUserGroup.usergp_id ? currentUserGroup : g
    ));
    setIsModalOpen(false);
  };

  const columns: ColumnDefinition<UserGroup>[] = [
    { key: 'usergp_id', header: 'User Group ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'system_type', header: 'System Type', sortable: false },
    { key: 'description', header: 'Description', sortable: false },
    {
      key: 'action',
      header: 'Action',
      sortable: false,
      render: (usergroup) => (
        <button onClick={() => handleEdit(usergroup)} className="px-2 py-1 hover:text-blue-600">
          <FaRegEdit />
        </button>
      )
    }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Groups</h1>
        <Link href="/admin/usergroup/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create New User Group
        </Link>
      </div>

      <Table<UserGroup> columns={columns} data={userGroups} itemsPerPage={5} className="mt-4" />

      {isModalOpen && currentUserGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User Group</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                value={currentUserGroup.name}
                onChange={(e) => setCurrentUserGroup({ ...currentUserGroup, name: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="text"
                value={currentUserGroup.description}
                onChange={(e) => setCurrentUserGroup({ ...currentUserGroup, description: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
