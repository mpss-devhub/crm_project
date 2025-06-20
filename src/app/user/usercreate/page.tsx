'use client';
import { useState } from 'react';
import Layout from "@/components/Layout";
import InputBox from 'components/InputBox';
import Button from 'components/Backbtn';
import PasswordBox from 'components/PasswordBox';
import SelectBox from '@/components/selectBox';
import { Label } from '@/components/label';
import CreateButton from '@/components/createBtn';

export default function UserCreatePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [formErrors, setFormErrors] = useState({ userGroup: '' });

    const userGroups = [
        { value: "", label: "Select a user group", disabled: true },
        { value: "admin", label: "Administrators" },
        { value: "editor", label: "Editors" },
        { value: "viewer", label: "Viewers" },
    ];
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Form submitted!');
    };

    return (
        <Layout>
            <div className='flex justify-between'>
                <h1 className='font-bold text-2xl'>Create User</h1>
                <Button href="/user" className="mb-4" />
            </div>
            <div className="max-w-4xl mx-auto md:mx-auto rounded-lg shadow-md p-6 mt-3">
                <div className="max-w-lg space-y-4 mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-28">
                            <Label htmlFor="name" required={true}>
                                Name
                            </Label>
                        </div>
                        <div className="flex-1">
                            <InputBox
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-28">
                            <Label htmlFor="inputField" required={true}>
                                Email
                            </Label>
                        </div>
                        <div className="flex-1">
                            <InputBox
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-28">
                            <Label htmlFor="inputField" required={false}>
                                Phone
                            </Label>
                        </div>
                        <div className="flex-1">
                            <InputBox
                                id="phone"
                                type="text"
                                placeholder="Enter your phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-28">
                            <Label htmlFor="inputField" required={true}>
                                Password
                            </Label>
                        </div>
                        <div className="flex-1">
                            <PasswordBox
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-28">
                            <Label htmlFor="inputField" required={true}>
                                User Group
                            </Label>
                        </div>
                        <div className="flex-1">
                            <SelectBox
                                id="userGroup"
                                value={selectedGroup}
                                onChange={(e) => {
                                    setSelectedGroup(e.target.value);
                                    setFormErrors({ ...formErrors, userGroup: '' });
                                }}
                                required
                                options={userGroups}
                                errorMessage={formErrors.userGroup}
                                className=""
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <CreateButton
                            id="submit-btn"
                            value="Create Account"
                            onClick={handleSubmit}
                            className="ml-auto custom-class-if-needed"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}