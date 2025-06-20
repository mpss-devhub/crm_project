'use client';
import Image from "next/image";
import { useState } from 'react';
import InputBox from './InputBox';
import PasswordBox from './PasswordBox';
import Button from "./Button";
import { Label } from "./label";
import { useRouter } from "next/router";
import type { FormEvent } from 'react';


export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-screen">
                <main className="w-2xl px-4 md:px-6">
                    <Image
                        aria-hidden
                        src="/logo.png"
                        alt="CRM icon"
                        width={130}
                        height={100}
                        className="w-[100px] sm:w-[120px] md:w-[130px]"
                    />
                    <div className="max-w-xl my-6 px-2 sm:px-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                            Get Started Now
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <div className="max-w-lg space-y-4 mx-auto">
                        <Label htmlFor="inputField" required={true}>
                            Name
                        </Label>
                        <InputBox
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Label htmlFor="inputField" required={true}>
                            Email
                        </Label>
                        <InputBox
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Label htmlFor="inputField" required={true}>
                            Password
                        </Label>
                        <PasswordBox
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            id="login"
                            value="Login"
                            onClick={() => {
                                console.log('Login clicked');
                            }}
                            className="w-full"
                        />
                    </div>
                </main>
            </div>
        </div>

    );
}
