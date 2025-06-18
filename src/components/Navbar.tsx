'use client'

import { useState, useEffect } from 'react'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-gray-900/80 shadow-md backdrop-blur'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                <a href="#hero" className="text-xl font-bold hover:text-indigo-400">
                </a>
                <div className="space-x-6 hidden md:flex">
                    <a href="#about" className="hover:text-indigo-400 transition">
                        About
                    </a>
                    <a href="#projects" className="hover:text-indigo-400 transition">
                        Projects
                    </a>
                    <a href="#contact" className="hover:text-indigo-400 transition">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
