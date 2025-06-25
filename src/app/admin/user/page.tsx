'use client';
import { useState } from 'react';
import Layout from "@/components/Layout";
import Button from 'components/Button';
import { FaUserPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Table, ColumnDefinition } from '@/components/Table';
import { Label } from '@/components/label';
import InputBox from '@/components/InputBox';
import SelectBox from '@/components/selectBox';

interface User {
    id: number;
    userid: string;
    name: string;
    email: string;
    phone: string;
    usergp: string;
    type: 'admin' | 'client';
    project: string;
    action: string;
}

export default function UserCreatePage() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, userid: 'A00001', name: 'John DoeJohn Doe', email: 'john@example.com', phone: '0912345678', usergp: 'Gp001', type: 'admin', project: '', action: '' },
        { id: 2, userid: 'A00002', name: 'Jane Smith', email: 'jane@example.com', phone: '0912345678', usergp: 'Gp001', type: 'client', project: 'MTI', action: '' },
    ]);

    // Edit modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        
        setUsers(users.map(user =>
            user.id === currentUser.id ? currentUser : user
        ));
        setIsModalOpen(false);
    };

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const userGroups = [
        { value: "", label: "Select a user group", disabled: true },
        { value: "Gp001", label: "Group 001" },
        { value: "Gp002", label: "Group 002" },
    ];

    const columns: ColumnDefinition<User>[] = [
        {
            key: 'index',
            header: '#',
            sortable: false,
            render: (_: any, index?: number) => (index ?? 0) + 1
        },
        {
            key: 'userid',
            header: 'UserID',
            sortable: true
        },
        {
            key: 'name',
            header: 'Name',
            sortable: false
        },
        {
            key: 'email',
            header: 'Email',
            sortable: false
        },
        {
            key: 'phone',
            header: 'Phone',
            sortable: false
        },
        {
            key: 'usergp',
            header: 'User Group',
            sortable: false
        },
        {
            key: 'type',
            header: 'Type',
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs ${item.type === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {item.type}
                </span>
            )
        },
        {
            key: 'project',
            header: 'Project',
        },
        {
            key: 'action',
            header: 'Actions',
            render: (user) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(user)}
                        className="px-2 py-1 rounded hover:text-blue-600 cursor-pointer"
                    >
                        <FaRegEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(user.id)} 
                        className="px-2 py-1 rounded text-red-600 cursor-pointer"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>User List</h1>
                <Button
                    id="add-user-btn"
                    onClick={() => (window.location.href = "/user")}
                    className="mb-4 bg-[#4CAF50] hover:bg-[#3e8e41] text-white px-4 py-2 rounded flex items-center gap-2 justify-center"
                >
                    <FaUserPlus />
                    Add User
                </Button>
            </div>
            <Table<User>
                columns={columns}
                data={users}
                itemsPerPage={5}
                className="mt-6"
            />
            
            {isModalOpen && currentUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <form onSubmit={handleSave}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-28">
                                        <Label htmlFor="userid">User Id</Label>
                                    </div>
                                    <div className="flex-1">
                                        <InputBox
                                            id="userid"
                                            type="text"
                                            value={currentUser.userid}
                                            onChange={(e) => setCurrentUser({ ...currentUser, userid: e.target.value })}
                                            disabled
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-28">
                                        <Label htmlFor="name">Name</Label>
                                    </div>
                                    <div className="flex-1">
                                        <InputBox
                                            id="name"
                                            type="text"
                                            value={currentUser.name}
                                            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-28">
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <div className="flex-1">
                                        <InputBox
                                            id="email"
                                            type="email"
                                            value={currentUser.email}
                                            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-28">
                                        <Label htmlFor="phone">Phone</Label>
                                    </div>
                                    <div className="flex-1">
                                        <InputBox
                                            id="phone"
                                            type="tel"
                                            value={currentUser.phone}
                                            onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-28">
                                        <Label htmlFor="usergp">User Group</Label>
                                    </div>
                                    <div className="flex-1">
                                        <SelectBox
                                            id="usergp"
                                            value={currentUser.usergp}
                                            onChange={(e) => setCurrentUser({ ...currentUser, usergp: e.target.value })}
                                            options={userGroups}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                       <Button
                    id="add-user-btn"
                    onClick={() => (window.location.href = "/user")}
                    className="mb-4 bg-[#464f51] hover:bg-white text-white hover:text-[#464f51] px-4 py-2 rounded"
                >
                  Cancel
                </Button>
                                <Button
                    id="add-user-btn"
                    onClick={() => (window.location.href = "/user")}
                    className="mb-4 bg-[#3CC3DF] hover:bg-white text-white hover:text-[#3CC3DF] px-4 py-2 rounded"
                >
                  Update
                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}