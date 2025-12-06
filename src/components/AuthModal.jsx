import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { Icon } from './icons';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            let result;
            if (isLogin) {
                result = await login(email, password);
            } else {
                result = await register(email, username, password);
            }

            if (result.success) {
                onClose();
            } else {
                setError(result.error || 'Authentication failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Quick demo login
    const handleDemoLogin = async () => {
        setIsLoading(true);
        const result = await login('shyan@calquest.com', 'password123');
        if (result.success) {
            onClose();
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-surface/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-textPrimary/10 shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <Icon name="logo" size={48} color="#6B8DD6" className="mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-textPrimary mb-2">
                        {isLogin ? 'Welcome Back!' : 'Join CalQuest'}
                    </h2>
                    <p className="text-textSecondary">
                        {isLogin ? 'Continue your calculus journey' : 'Start learning calculus today'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        className="bg-error/20 border border-error text-error px-4 py-3 rounded-lg mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-textSecondary text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-background/50 border border-textPrimary/20 rounded-xl text-textPrimary focus:outline-none focus:border-primary transition-colors"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-textSecondary text-sm mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-background/50 border border-textPrimary/20 rounded-xl text-textPrimary focus:outline-none focus:border-primary transition-colors"
                                placeholder="cooluser123"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-textSecondary text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-background/50 border border-textPrimary/20 rounded-xl text-textPrimary focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                {/* Demo Login */}
                <button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full mt-3 bg-accent/20 hover:bg-accent/30 text-accent font-semibold py-3 rounded-xl transition-all"
                >
                    🚀 Try Demo Account
                </button>

                {/* Toggle */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <span className="text-primary font-semibold">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthModal;
