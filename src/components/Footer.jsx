import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Headerpwn. Security Research.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-indigo-400 transition-colors">Docs</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
