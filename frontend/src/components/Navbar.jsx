import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Bell, Search, Sun, Moon } from 'lucide-react';

const Navbar = ({ title }) => {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm transition-colors duration-300">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>

            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="peer pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm dark:text-slate-200 focus:ring-4 focus:ring-primary-500/10 w-64 focus:w-80 transition-all duration-300 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-200 dark:focus:border-primary-500/30 focus:shadow-sm outline-none"
                    />
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button className="relative p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-primary-50 dark:hover:bg-slate-800">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse-soft"></span>
                </button>

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6 transition-colors duration-300 hover:opacity-80"
                    >
                        <div className="text-sm text-right hidden sm:block">
                            <div className="font-semibold text-slate-800 dark:text-slate-100">{user?.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{user?.department}</div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-slate-900 dark:text-white truncate" title={user?.name}>{user?.name}</h4>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium truncate">{user?.role}</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex flex-col">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate" title={user?.email}>{user?.email}</span>
                                </div>
                                <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex flex-col">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Department</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-200">{user?.department}</span>
                                </div>
                                <div className="flex flex-col pb-1">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Role</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-200">{user?.role}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
