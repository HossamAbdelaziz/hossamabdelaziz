'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import { Typewriter } from 'react-simple-typewriter'
import Lottie from 'lottie-react'
import heroAnimation from '@/../public/hero-animation.json'


export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center px-6 bg-gray-950 text-white"
        >
            <div className="max-w-4xl w-full text-center">
                <Lottie
                    animationData={heroAnimation}
                    loop={true}
                    className="w-40 sm:w-60 md:w-80 mx-auto mb-8"

                />
                {/* Name */}
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Hossam Abdelaziz
                </motion.h1>

                {/* Typing Subtitle */}
                <motion.h2
                    className="text-xl md:text-2xl text-indigo-400 mb-4 h-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Typewriter
                        words={[
                            'Frontend Developer',
                            'React & Next.js Specialist',
                            'Clean UI Enthusiast',
                            'Code with Purpose',
                            'Software Developer',
                        ]}

                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />
                </motion.h2>

                {/* Icon Links */}
                <motion.div
                    className="flex justify-center gap-6 text-2xl text-gray-300 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <a
                        href="https://github.com/HossamAbdelaziz?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="mailto:hossam.anwar.aziz@gmail.com"
                        className="hover:text-white transition"
                    >
                        <FaEnvelope />
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition flex items-center gap-2 text-sm"
                    >
                        <FaFileAlt className="text-lg" />
                        <span>Resume</span>
                    </a>
                </motion.div>




                {/* Description */}
                <motion.p
                    className="text-gray-400 mb-10 leading-relaxed text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    I build fast, elegant, and accessible web interfaces using modern tools like React, Next.js, and Tailwind CSS. My focus is turning ideas into polished user experiences that are intuitive, scalable, and performance-driven.
                    <br /><br />
                    I've delivered full-stack solutions including client dashboards, booking systems, and business tools — always driven by clean architecture, thoughtful design, and real-world impact.
                    <br /><br />
                    Based in Oakville, Canada. When I’m not coding, I’m playing tennis, exploring tech trends, or creating side projects that solve everyday problems.
                </motion.p>

                {/* CTA Links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-6 text-2xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    {['Projects', 'Contact'].map((label, index) => (
                        <motion.a
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="relative group text-xl md:text-2xl font-semibold text-gray-100"
                        >
                            {label}
                            <span className="block h-[2px] bg-indigo-500 max-w-0 group-hover:max-w-full transition-all duration-300"></span>
                        </motion.a>
                    ))}

                </motion.div>
            </div>
        </section>
    )
}
