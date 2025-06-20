'use client';
import Image from "next/image";
import { useState } from 'react';
import InputBox from 'components/InputBox';
import PasswordBox from 'components/PasswordBox';
import Button from "components/Button";
import { Label } from '@/components/label';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="container mx-auto px-4 bg-[#38516C] text-white">
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
                    <div className="max-w-xl px-2 sm:px-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                            Get Started Now
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <div className="max-w-[460px] space-y-4 mx-auto">
                        <Label htmlFor="name" required={true}>
                            Name
                        </Label>
                        <InputBox
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="placeholder:text-[#3E4354] placeholder:opacity-75"
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
                            className="placeholder:text-[#3E4354] placeholder:opacity-75"
                        />
                        <Label htmlFor="inputField" required={true}>
                            Password
                        </Label>
                        <PasswordBox
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="placeholder:text-[#3E4354] placeholder:opacity-75"
                        />
                        <Button
                            id="login"
                            onClick={() => {
                                console.log('Login clicked');
                            }}
                            className="bg-[#1035A3] opacity-85 hover:bg-white hover:border-[#1035A3] hover:text-[#1035A3] max-w-[460px] py-2"
                        >
                            Login
                        </Button>
                    </div>
                </main>
            </div>
        </div>

    );
}
