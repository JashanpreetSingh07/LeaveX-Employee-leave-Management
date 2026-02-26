import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LeaveForm from '../components/LeaveForm';
import ReimbursementForm from '../components/ReimbursementForm';
import { motion } from 'framer-motion';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get('tab') || 'dashboard';
    const [activeHistory, setActiveHistory] = useState(queryParams.get('history') || 'leaves');

    const [leaves, setLeaves] = useState([]);
    const [reimbursements, setReimbursements] = useState([]);

    const fetchData = async () => {
        try {
            const leaveRes = await axios.get('/api/leaves');
            setLeaves(leaveRes.data);
            const reimbRes = await axios.get('/api/reimbursements');
            setReimbursements(reimbRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
    const approvedLeaves = leaves.filter(l => l.status === 'Approved').length;
    const pendingReimb = reimbursements.filter(r => r.status === 'Pending').length;
    const approvedReimb = reimbursements.filter(r => r.status === 'Approved').length;

    return (
        <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar title="Employee Workspace" />

                <main className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                {/* Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/50 shadow-sm hover:shadow-lg hover:shadow-rose-100/50 dark:hover:shadow-rose-900/20 hover:-translate-y-1 transition duration-300">
                                        <div className="text-rose-500 font-medium mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div> Pending Leaves</div>
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{pendingLeaves}</div>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 transition duration-300">
                                        <div className="text-emerald-500 font-medium mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Approved Leaves</div>
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{approvedLeaves}</div>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20 hover:-translate-y-1 transition duration-300">
                                        <div className="text-amber-500 font-medium mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> Pending Claims</div>
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{pendingReimb}</div>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition duration-300">
                                        <div className="text-blue-500 font-medium mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Approved Claims</div>
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{approvedReimb}</div>
                                    </motion.div>
                                </div>
                                {/* Tabs for History */}
                                <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <button
                                        className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${activeHistory === 'leaves' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                                        onClick={() => {
                                            setActiveHistory('leaves');
                                            window.history.replaceState(null, '', '/employee-dashboard?tab=dashboard')
                                        }}
                                    >
                                        Leave History
                                    </button>
                                    <button
                                        className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${activeHistory === 'reimbursements' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                                        onClick={() => {
                                            setActiveHistory('reimbursements');
                                            window.history.replaceState(null, '', '/employee-dashboard?tab=dashboard&history=reimbursements')
                                        }}
                                    >
                                        Reimbursement History
                                    </button>
                                </div>

                                {/* History Data */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                                            {activeHistory === 'reimbursements' ? 'My Reimbursements' : 'My Leaves'}
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider transition-colors">
                                                    {activeHistory === 'reimbursements' ? (
                                                        <>
                                                            <th className="px-6 py-4 font-semibold">Date</th>
                                                            <th className="px-6 py-4 font-semibold">Amount</th>
                                                            <th className="px-6 py-4 font-semibold">Description</th>
                                                            <th className="px-6 py-4 font-semibold">Status</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th className="px-6 py-4 font-semibold">Type</th>
                                                            <th className="px-6 py-4 font-semibold">Duration</th>
                                                            <th className="px-6 py-4 font-semibold">Reason</th>
                                                            <th className="px-6 py-4 font-semibold">Status</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                                {activeHistory !== 'reimbursements' && leaves.map((leave, idx) => (
                                                    <motion.tr key={leave._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-slate-700 dark:text-slate-300 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{leave.leaveType}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                            {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
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
                                                    </motion.tr>
                                                ))}

                                                {activeHistory === 'reimbursements' && reimbursements.map((r, idx) => (
                                                    <motion.tr key={r._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                            {new Date(r.createdAt || Date.now()).toLocaleDateString()}
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
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {(activeHistory !== 'reimbursements' && leaves.length === 0) && (
                                            <div className="p-8 text-center text-slate-500 dark:text-slate-400">No leave history found.</div>
                                        )}
                                        {(activeHistory === 'reimbursements' && reimbursements.length === 0) && (
                                            <div className="p-8 text-center text-slate-500 dark:text-slate-400">No reimbursement history found.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'apply' && (
                            <div className="max-w-3xl mx-auto">
                                <LeaveForm onSuccess={fetchData} />
                            </div>
                        )}

                        {activeTab === 'reimbursements' && (
                            <div className="max-w-3xl mx-auto">
                                <ReimbursementForm onSuccess={fetchData} />
                            </div>
                        )}

                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
