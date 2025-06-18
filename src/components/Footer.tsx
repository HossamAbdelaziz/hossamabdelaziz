const Footer = () => {
    return (
        <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-800">
            <p>
                © {new Date().getFullYear()} Hossam Abdelaziz. Built with Next.js & Tailwind CSS.
            </p>
            <p>
                Designed with ❤️ and deployed on <a href="https://vercel.com" target="_blank" className="text-blue-400 hover:underline">Vercel</a>
            </p>
        </footer>
    );
};

export default Footer;
