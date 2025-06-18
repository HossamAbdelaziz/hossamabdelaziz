'use client';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
                className="text-4xl font-bold text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Me
            </motion.h2>

            <motion.p
                className="text-center text-gray-300 mb-10 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                I'm open to full-time roles, freelance opportunities, and collaborations. Let’s connect!
            </motion.p>

            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-12 items-center space-y-6 sm:space-y-0 text-lg text-gray-300">
                {/* Email */}
                <a
                    href="mailto:hossam.anwar.aziz@gmail.com"
                    className="flex items-center gap-2 hover:text-white transition"
                >
                    <FaEnvelope className="text-xl" color="#EA4335" />
                    hossam.anwar.aziz@gmail.com
                </a>

                {/* Phone */}
                <a
                    href="tel:+11234567890"
                    className="flex items-center gap-2 hover:text-white transition"
                >
                    <FaPhoneAlt className="text-xl" color="#34A853" />
                    +1 (647) 675-3343
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition"
                >
                    <FaLinkedin className="text-xl" color="#0077B5" />
                    linkedin.com/in/Hossam-Anwar-Abdelaziz
                </a>
            </div>
        </section>
    );
};

export default Contact;
