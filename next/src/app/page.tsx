'use client'
import Image from "next/image";
import LoginForm from 'components/LoginForm';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/posts')
        const response = data.json()
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  return (
    <main>
      <LoginForm />
    </main>
  );
}
