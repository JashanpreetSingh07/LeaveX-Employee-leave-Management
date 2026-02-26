import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LeaveForm = ({ onSuccess }) => {
    const [leaveType, setLeaveType] = useState('Sick Leave');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('/api/leaves', { leaveType, fromDate, toDate, reason });
            toast.success('Leave request submitted successfully');
            setLeaveType('Sick Leave');
            setFromDate('');
            setToDate('');
            setReason('');
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">📅</span> Apply for Leave
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Leave Type</label>
                        <select
                            value={leaveType}
                            onChange={e => setLeaveType(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                        >
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Paid Leave">Paid Leave</option>
                            <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">From Date</label>
                        <input
                            type="date"
                            required
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 [color-scheme:light_dark]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">To Date</label>
                        <input
                            type="date"
                            required
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 [color-scheme:light_dark]"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Reason</label>
                        <textarea
                            required
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            rows="3"
                            placeholder="Please provide a reason for your leave..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition resize-none bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default LeaveForm;
