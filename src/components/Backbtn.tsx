'use client'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

interface BackBtnProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

export default function BackBtn({ href, className = '', children }: BackBtnProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      <IoArrowBack className="mr-1" size={24} />
      {children}
    </button>
  )
}