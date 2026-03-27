'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // Verificar se tem acesso de admin ou site_access
        const checkAccess = () => {
            const hasAccess = document.cookie.includes('site_access=granted')
            setIsAdmin(hasAccess)
        }
        checkAccess()
    }, [])

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-[#ff85a1] hover:text-[#ff6b8f] transition-colors"
                aria-label="User menu"
            >
                <div className="w-8 h-8 rounded-full border border-[#ff85a1]/30 flex items-center justify-center bg-white/50 overflow-hidden">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-50 mb-2">
                            <p className="text-[10px] text-gray-400 tracking-widest uppercase">O Mundo de Lizzie</p>
                            <p className="text-xs text-gray-800 font-medium mt-1">Bem-vinda!</p>
                        </div>
                        
                        <Link 
                            href="/admin" 
                            className="block px-4 py-2 text-xs text-gray-600 hover:text-[#ff85a1] hover:bg-pink-50 transition-all text-left uppercase tracking-widest"
                            onClick={() => setIsOpen(false)}
                        >
                            Administração
                        </Link>
                        
                        <Link 
                            href="/loja" 
                            className="block px-4 py-2 text-xs text-gray-600 hover:text-[#ff85a1] hover:bg-pink-50 transition-all text-left uppercase tracking-widest"
                            onClick={() => setIsOpen(false)}
                        >
                            Ver Loja
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
