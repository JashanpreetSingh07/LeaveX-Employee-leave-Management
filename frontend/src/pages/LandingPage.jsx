import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, CheckCircle, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-primary-500 selection:text-white relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-slate-900/50 fixed w-full top-0 z-50 border-b border-white/10">
                <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <span className="text-white font-extrabold text-sm">L</span>
                    </div>
                    LeaveX
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="px-5 py-2 rounded-full font-medium transition hover:text-primary-300">
                        Log In
                    </Link>
                    <Link to="/register" className="px-5 py-2 rounded-full font-medium bg-white text-slate-900 hover:bg-primary-50 transition shadow-lg shadow-white/10 hover:-translate-y-0.5">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                        Modernize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">team's workflow</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed">
                        A highly sophisticated platform for unified leave management, reimbursements, and team administration. Built for the modern agile enterprise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="px-8 py-4 rounded-full font-semibold bg-primary-600 hover:bg-primary-500 transition text-center shadow-lg shadow-primary-500/30 hover:-translate-y-1 text-lg">
                            Start for Free
                        </Link>
                    </div>

                    <div className="pt-8 flex gap-8 border-t border-white/10">
                        <div>
                            <div className="text-3xl font-bold">99%</div>
                            <div className="text-sm text-slate-400 mt-1">Faster Approvals</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">10k+</div>
                            <div className="text-sm text-slate-400 mt-1">Teams Active</div>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Showcase */}
                <motion.div
                    style={{ y: y1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative animate-float"
                >
                    {/* Main Float Panel */}
                    <div className="glass-dark rounded-2xl p-6 shadow-2xl relative z-10 border border-white/10 transform rotate-1 hover:rotate-0 transition duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg">Recent Leave Requests</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live Updates</span>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center font-bold">JD</div>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">John Doe</div>
                                        <div className="text-xs text-slate-400">Sick Leave • 2 Days</div>
                                    </div>
                                    {i === 1 ? <CheckCircle className="text-emerald-400 w-5 h-5" /> : <div className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300">Pending</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-500/20 to-cyan-500/20 blur-3xl -z-10 rounded-full" />
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-24 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need to manage your team</h2>
                        <p className="text-slate-600 dark:text-slate-400">Powerful, intuitive, and designed to save you hours of administrative work.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Calendar className="w-6 h-6" />,
                                color: "blue",
                                title: "Leave Management",
                                text: "Streamlined workflows for requesting, reviewing, and approving employee time-off requests with real-time status updates."
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6" />,
                                color: "emerald",
                                title: "Expense Reimbursement",
                                text: "Integrated expense claims allowing employees to submit receipts and track reimbursement statuses effortlessly."
                            },
                            {
                                icon: <ShieldCheck className="w-6 h-6" />,
                                color: "purple",
                                title: "Role-Based Access",
                                text: "Enterprise-grade security with tailored dashboards for Employees, Managers, and System Administrators."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 dark:text-${feature.color}-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
