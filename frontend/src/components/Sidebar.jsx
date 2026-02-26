import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Users, LogOut, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
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

    if (!user) return null;

    const employeeLinks = [
        { name: 'Dashboard', path: '/employee-dashboard', icon: LayoutDashboard },
        { name: 'Apply Leave', path: '/employee-dashboard?tab=apply', icon: Calendar },
        { name: 'Reimbursements', path: '/employee-dashboard?tab=reimbursements', icon: Receipt },
    ];

    const managerLinks = [
        { name: 'Leave Approvals', path: '/manager-dashboard', icon: FileText },
        { name: 'Reimbursement Approvals', path: '/manager-dashboard?tab=reimbursements', icon: Receipt },
    ];

    const adminLinks = [
        { name: 'Manage Users', path: '/admin-dashboard', icon: Users },
    ];

    let links = [];
    if (user.role === 'Employee') links = employeeLinks;
    else if (user.role === 'Manager') links = [...employeeLinks, ...managerLinks];
    else if (user.role === 'Admin') links = [...employeeLinks, ...managerLinks, ...adminLinks];

    return (
        <div className="w-64 bg-slate-900 text-slate-300 h-screen sticky top-0 flex flex-col border-r border-slate-800">
            <div className="h-16 flex items-center px-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <span className="text-white font-extrabold text-sm">L</span>
                    </div>
                    LeaveX
                </div>
            </div>

            <div className="p-4 flex-1 mt-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Main Menu</div>
                <div className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname + location.search === link.path;

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${isActive ? 'text-white' : 'hover:text-white hover:bg-slate-800/50'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-primary-600/20 border border-primary-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] rounded-lg -z-10"
                                    />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}`} />
                                <span className="font-medium text-sm">{link.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>

            <div className="p-4 border-t border-white/10 mt-auto relative" ref={profileRef}>
                {isProfileOpen && (
                    <div className="absolute bottom-full left-4 mb-2 w-[calc(100%-2rem)] bg-slate-800 rounded-xl shadow-xl border border-white/10 p-4 z-50 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-bold text-white truncate" title={user.name}>{user.name}</h4>
                                <p className="text-xs text-primary-400 font-medium truncate">{user.role}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm border-t border-white/10 pt-3">
                            <div className="flex flex-col pb-1">
                                <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Email</span>
                                <span className="font-medium text-slate-200 text-xs truncate" title={user.email}>{user.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Department</span>
                                <span className="font-medium text-slate-200 text-xs truncate">{user.department}</span>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-white/5 hover:border-white/10 transition-all cursor-pointer group w-full text-left"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-inner group-hover:scale-105 transition-transform flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                        <div className="text-xs text-primary-400 font-medium truncate">{user.role}</div>
                    </div>
                </button>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
