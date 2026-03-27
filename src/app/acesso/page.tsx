'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AccessPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password.toUpperCase() }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                setError('Acesso negado. Palavra-passe incorreta.');
            }
        } catch (err) {
            setError('Erro ao verificar acesso.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className="mb-6">
                    <span className="text-4xl text-white logo-text font-serif">O Mundo de Lizzie</span>
                </div>
                <p className={styles.subtitle}>Trabalhos Manuais feitos com Amor e Dedicação</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            placeholder="PALAVRA-PASSE"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${styles.input} ${error ? styles.inputError : ''}`}
                            disabled={loading}
                            autoFocus
                        />
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="mt-4 px-8 py-3 bg-white text-pink-500 font-bold rounded-full hover:bg-pink-50 transition-all opacity-0 pointer-events-none"
                    >
                        Entrar
                    </button>
                </form>
            </div>
            
            <footer className={styles.footer}>
                &copy; 2026 O Mundo de Lizzie. Todos os direitos reservados.
            </footer>
        </div>
    );
}
