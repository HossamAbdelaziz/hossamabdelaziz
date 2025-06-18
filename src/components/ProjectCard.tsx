'use client';

import { useState } from 'react';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaApple,
    FaAndroid,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProjectProps {
    title: string;
    description: string;
    status: 'live' | 'in-progress' | 'planned';
    github?: string;
    live?: string;
    ios?: string;
    android?: string;
    technologies?: string[];
}

const statusColors = {
    live: 'bg-green-600',
    'in-progress': 'bg-yellow-500',
    planned: 'bg-gray-500',
};

export default function ProjectCard({
    title,
    description,
    status,
    github,
    live,
    ios,
    android,
    technologies,
}: ProjectProps) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className="border border-neutral-800 rounded-xl p-5 bg-neutral-900 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
        >
            {/* Title + Status */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <span
                    className={`text-xs font-semibold text-white px-2 py-1 rounded ${statusColors[status]}`}
                >
                    {status === 'live'
                        ? 'Live'
                        : status === 'in-progress'
                            ? 'In Progress'
                            : 'Planned'}
                </span>
            </div>

            {/* Icons */}
            <div className="flex gap-4 text-white text-xl mb-2">
                {github && (
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaGithub />
                    </a>
                )}
                {live && (
                    <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaExternalLinkAlt />
                    </a>
                )}
                {ios && (
                    <a
                        href={ios}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaApple />
                    </a>
                )}
                {android && (
                    <a
                        href={android}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                    >
                        <FaAndroid />
                    </a>
                )}
            </div>

            {/* Toggle Description */}
            <button
                onClick={() => setOpen(!open)}
                className="text-sm text-blue-400 hover:underline"
            >
                {open ? 'Hide details' : 'View details'}
            </button>

            {/* Description + Tags */}
            {open && (
                <motion.div
                    className="mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-sm text-gray-300">{description}</p>

                    {technologies && technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
