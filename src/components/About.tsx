'use client';
import { motion } from 'framer-motion';
import {
    SiJavascript,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiFirebase,
    SiFigma,
    SiVercel,
    SiStripe,
    SiPostman,
    SiCss3,
    SiGit,
} from 'react-icons/si';
import { FaReact, FaGithub } from 'react-icons/fa';

const techIcons = [
    { icon: SiJavascript, color: '#f7df1e' },
    { icon: SiTypescript, color: '#3178c6' },
    { icon: FaReact, color: '#61dafb' },
    { icon: SiNextdotjs, color: '#ffffff' }, // was black
    { icon: SiTailwindcss, color: '#38bdf8' },
    { icon: SiCss3, color: '#264de4' },
    { icon: SiFirebase, color: '#ffca28' },
    { icon: SiStripe, color: '#635bff' },
    { icon: SiFigma, color: '#f24e1e' },
    { icon: SiGit, color: '#f05032' },
    { icon: FaGithub, color: '#ffffff' }, // was black
    { icon: SiVercel, color: '#ffffff' }, // was black
    { icon: SiPostman, color: '#ff6c37' },
];


const About = () => {
    return (
        <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
                className="text-4xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                About Me
            </motion.h2>

            <motion.p
                className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                I’m Hossam Abdelaziz, a frontend-focused developer with strong full-stack foundations and a passion for clean UI, fast performance, and real-world impact. I specialize in React, Next.js, and Firebase to build responsive, accessible platforms — from SaaS dashboards to client tools and booking systems.
                <br /><br />
                With a background in software development, I also work comfortably across Java, C#, REST APIs, and databases like Firestore, SQL, and MongoDB. Whether it’s creating a polished frontend or integrating backend services, I focus on shipping production-ready work that’s reliable and user-centered.
            </motion.p>

            <motion.div
                className="grid grid-cols-3 sm:grid-cols-6 gap-8 justify-items-center"
                initial="hidden"
                whileInView="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {techIcons.map(({ icon: Icon, color }, i) => (
                    <motion.div
                        key={i}
                        className="text-5xl hover:scale-110 transition-transform"
                        variants={{
                            hidden: { opacity: 0, scale: 0.5 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                    >
                        <Icon color={color} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;
