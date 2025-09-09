'use client';

import { get, UserGroup } from "@/lib/usergroups";
import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Table, ColumnDefinition } from '@/components/Table';
import Link from 'next/link';

export default function UserGroupListPage() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [currentUserGroup, setCurrentUserGroup] = useState<UserGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (userGroup: UserGroup) => {
    setCurrentUserGroup(userGroup);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserGroup) return;
    
    setUserGroups(userGroups.map(group =>
      group.usergp_id === currentUserGroup.usergp_id ? currentUserGroup : group
    ));
    setIsModalOpen(false);
  };

  // const handleDelete = (usergpId: number) => {
  //   if (confirm('Are you sure you want to delete this user group?')) {
  //     setUserGroups(userGroups.filter(group => group.usergp_id !== usergpId));
  //   }
  // };

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
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(usergroup)}
            className="px-2 py-1 rounded hover:text-blue-600 cursor-pointer"
          >
            <FaRegEdit />
          </button>
          {/* <button
            onClick={() => handleDelete(usergroup.usergp_id)} 
            className="px-2 py-1 rounded text-red-600 cursor-pointer"
          >
            <MdDeleteForever />
          </button> */}
        </div>
      )
    }
  ];

  useEffect(() => {
    async function fetchUserGroups() {
      try {
        const data = await get();
        setUserGroups(data);
      } catch (error) {
        console.error('Failed to fetch user groups', error);
      } 
    }

    fetchUserGroups();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Groups</h1>
        <Link 
          href="/admin/usergroup/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New User Group
        </Link>
      </div>
      
      <Table<UserGroup>
        columns={columns}
        data={userGroups}
        itemsPerPage={5}
        className="mt-4"
      />
      
      {/* Modal for editing user groups */}
      {isModalOpen && currentUserGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User Group</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={currentUserGroup.name}
                  onChange={(e) => setCurrentUserGroup({...currentUserGroup, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={currentUserGroup.description}
                  onChange={(e) => setCurrentUserGroup({...currentUserGroup, description: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
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