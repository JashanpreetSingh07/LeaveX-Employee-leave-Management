import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ManagerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);
    const [reimbursements, setReimbursements] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [currentTab, setCurrentTab] = useState(queryParams.get('tab') || 'leaves');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setCurrentTab(params.get('tab') || 'leaves');
    }, [location.search]);

    const fetchData = async () => {
        try {
            if (currentTab === 'leaves') {
                const res = await axios.get('/api/leaves');
                setLeaves(res.data);
            } else {
                const res = await axios.get('/api/reimbursements');
                setReimbursements(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentTab]);

    const handleLeaveAction = async (id, status) => {
        try {
            await axios.put(`/api/leaves/${id}`, { status });
            toast.success(`Leave ${status}`);
            fetchData();
        } catch (err) {
            toast.error('Failed to update leave');
        }
    };

    const handleReimbAction = async (id, status) => {
        try {
            await axios.put(`/api/reimbursements/${id}`, { status });
            toast.success(`Reimbursement ${status}`);
            fetchData();
        } catch (err) {
            toast.error('Failed to update reimbursement');
        }
    };

    return (
        <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar title={currentTab === 'leaves' ? 'Leave Approvals' : 'Claim Approvals'} />

                <main className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Pending Requests</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider transition-colors">
                                            <th className="px-6 py-4 font-semibold">Employee</th>
                                            <th className="px-6 py-4 font-semibold">Details</th>
                                            <th className="px-6 py-4 font-semibold">Reason/Desc</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        {currentTab === 'leaves' && leaves.map((leave, idx) => (
                                            <motion.tr key={leave._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
                                                            {leave.user?.name?.charAt(0) || '?'}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{leave.user?.name}</div>
                                                            <div className="text-xs text-slate-500 dark:text-slate-400">{leave.user?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-700 dark:text-slate-300 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{leave.leaveType}</div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate" title={leave.reason}>
                                                    {leave.reason}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 shadow-emerald-200/50' :
                                                        leave.status === 'Rejected' ? 'bg-red-100 text-red-700 shadow-red-200/50' :
                                                            'bg-amber-100 text-amber-700 shadow-amber-200/50'
                                                        }`}>
                                                        {leave.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {leave.status === 'Pending' && (
                                                        user.role === 'Manager' && leave.user?._id === user._id ? (
                                                            <span className="text-xs text-slate-500 italic opacity-80" title="Managers cannot approve their own leaves.">Self-approval disabled</span>
                                                        ) : (
                                                            <div className="flex gap-2 justify-end">
                                                                <button onClick={() => handleLeaveAction(leave._id, 'Approved')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-sm font-medium transition active:scale-95">Approve</button>
                                                                <button onClick={() => handleLeaveAction(leave._id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition active:scale-95">Reject</button>
                                                            </div>
                                                        )
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}

                                        {currentTab === 'reimbursements' && reimbursements.map((r, idx) => (
                                            <motion.tr key={r._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
                                                            {r.user?.name?.charAt(0) || '?'}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{r.user?.name}</div>
                                                            <div className="text-xs text-slate-500 dark:text-slate-400">{r.user?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-700 dark:text-slate-300 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">${r.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate" title={r.description}>
                                                    {r.description}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 shadow-emerald-200/50' :
                                                        r.status === 'Rejected' ? 'bg-red-100 text-red-700 shadow-red-200/50' :
                                                            'bg-amber-100 text-amber-700 shadow-amber-200/50'
                                                        }`}>
                                                        {r.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {r.status === 'Pending' && (
                                                        user.role === 'Manager' && r.user?._id === user._id ? (
                                                            <span className="text-xs text-slate-500 italic opacity-80" title="Managers cannot approve their own reimbursements.">Self-approval disabled</span>
                                                        ) : (
                                                            <div className="flex gap-2 justify-end">
                                                                <button onClick={() => handleReimbAction(r._id, 'Approved')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-sm font-medium transition active:scale-95">Approve</button>
                                                                <button onClick={() => handleReimbAction(r._id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition active:scale-95">Reject</button>
                                                            </div>
                                                        )
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                                {((currentTab === 'leaves' && leaves.length === 0) || (currentTab === 'reimbursements' && reimbursements.length === 0)) && (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">No requests found.</div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ManagerDashboard;
