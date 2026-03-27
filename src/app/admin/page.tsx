'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '@/app/actions/products';

interface Product {
    id: string;
    name: string;
    type: string;
    price: number;
    description: string | null;
    is_weekly_highlight: boolean;
    weekly_highlight_image: string | null;
    image: string | null;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);


    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        type: 'Bebé',
        price: 0,
        description: '',
        is_weekly_highlight: false,
        image: '',
        weekly_highlight_image: ''
    });

    const types = ['Bebé', 'Batismo', 'Brincos', 'Decoração', 'Outros'];
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchProducts();
    }, []);

    async function checkAuth() {
        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                body: JSON.stringify({ checkOnly: true })
            });
            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsAuthenticating(true);
        setAuthError('');

        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                const data = await res.json();
                setAuthError(data.error || 'Password incorreta');
            }
        } catch (error) {
            setAuthError('Erro ao verificar a password.');
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function fetchProducts() {
        try {
            setLoading(true);
            const data = await getAllProducts();
            if (data) setProducts(data as Product[]);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao carregar produtos da base de dados local.');
        } finally {
            setLoading(false);
        }
    }


    async function handleDelete(id: string) {
        if (!confirm('Tem a certeza que deseja apagar este produto?')) return;

        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            alert('Produto removido com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar:', error);
            alert('Erro ao apagar produto.');
        }
    }

    function handleEdit(product: Product) {
        setEditingProduct(product);
        setFormData(product);
        setView('form');
    }

    function handleCreate() {
        setEditingProduct(null);
        setFormData({
            name: '',
            type: 'Bebé',
            price: 0,
            description: '',
            is_weekly_highlight: false,
            image: '',
            weekly_highlight_image: ''
        });
        setView('form');
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'weekly_highlight_image') {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, [target]: data.path }));
            } else {
                alert('Erro ao carregar imagem.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erro na ligação ao servidor.');
        } finally {
            setIsUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.image) {
            alert('Por favor selecione uma imagem.');
            return;
        }

        try {
            // Validate price
            if (isNaN(formData.price || 0)) {
                alert('Por favor, introduza um preço válido.');
                return;
            }

            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
                alert('Produto atualizado com sucesso!');
            } else {
                await createProduct(formData as any);
                alert('Produto criado com sucesso!');
            }

            fetchProducts();
            setView('list');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar produto.');
        }
    }

    const styles = {
        pageContainer: {
            padding: '2rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: 'var(--color-light)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            border: '1px solid var(--color-gray-200)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const,
        },
        th: {
            textAlign: 'left' as const,
            padding: '1rem',
            borderBottom: '2px solid var(--color-gray-200)',
            color: 'var(--color-gray-700)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid var(--color-gray-200)',
            verticalAlign: 'middle',
        },
        imageContainer: {
            position: 'relative' as const,
            width: '60px',
            height: '60px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            overflow: 'hidden',
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'var(--color-gray-700)',
        },
        modalOverlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto' as const,
        },
        imageGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
        }
    };

    const getSafeImageSrc = (src: string | null | undefined) => {
        if (!src) return '/images/products/douro-2018.png';
        return src;
    };

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8]">
                <div style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>A verificar acesso...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8] p-8">
                <div className="max-w-[400px] w-full bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-xl">
                    <div className="mb-8">
                        <span className="text-3xl font-bold tracking-widest text-[#d4a373] logo-text">
                            LIZZIE <span className="text-[#ff85a1]">STORE</span>
                        </span>
                    </div>
                    
                    <h2 className="text-[#ff85a1] mb-6 text-xl font-serif">Área de Administração</h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        Introduza a chave de acesso para gerir os artigos.
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6 text-center outline-none focus:ring-2 focus:ring-[#ff85a1]/20"
                            autoFocus
                        />
                        {authError && <p className="text-red-500 text-xs mb-6">{authError}</p>}
                        
                        <button 
                            type="submit" 
                            disabled={isAuthenticating}
                            className="w-full p-3 bg-[#ff85a1] text-white font-bold rounded-lg cursor-pointer hover:bg-[#ff6b8f] transition-colors"
                        >
                            {isAuthenticating ? 'A entrar...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (view === 'form') {
        return (
            <div style={styles.pageContainer}>
                <button
                    onClick={() => setView('list')}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary transition-colors"
                >
                    ← Voltar à Lista
                </button>

                <h1 className="text-3xl mb-8 text-primary">
                    {editingProduct ? 'Editar Artigo' : 'Novo Artigo'}
                </h1>

                <div style={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nome do Artigo</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Categoria</label>
                                <select
                                    className="input"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    {types.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Preço (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                className="input"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Descrição</label>
                            <textarea
                                className="input textarea"
                                rows={3}
                                value={formData.description || ''}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Imagem do Artigo</label>
                            <div className="relative flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image-upload"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, 'image')}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className={`flex items-center justify-between w-full p-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                                        isUploading ? 'bg-gray-50 opacity-50' : 'bg-white hover:border-primary/50'
                                    }`}
                                >
                                    <span className="text-gray-500 text-sm">
                                        {formData.image ? formData.image.split('/').pop() : 'Clique para carregar foto...'}
                                    </span>
                                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">
                                        {isUploading ? 'A carregar...' : 'Procurar'}
                                    </span>
                                </label>
                            </div>
                            {formData.image && (
                                <div style={{ marginTop: '1rem', width: '100px', height: '100px', position: 'relative', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Image
                                        src={getSafeImageSrc(formData.image)}
                                        alt="Preview"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-8 mb-8">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_weekly_highlight"
                                    className="w-4 h-4 mr-2"
                                    checked={formData.is_weekly_highlight}
                                    onChange={e => setFormData({ ...formData, is_weekly_highlight: e.target.checked })}
                                />
                                <label htmlFor="is_weekly_highlight" className="text-sm font-bold text-gray-800">
                                    Destaque da Semana ✨
                                </label>
                            </div>
                        </div>

                        {formData.is_weekly_highlight && (
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Fotografia de Destaque (Alta Resolução)</label>
                                <div className="relative flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="weekly-highlight-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, 'weekly_highlight_image')}
                                    />
                                    <label
                                        htmlFor="weekly-highlight-upload"
                                        className="flex items-center justify-between w-full p-3 border-2 border-dashed border-secondary/30 bg-secondary/5 rounded-xl cursor-pointer hover:border-secondary transition-all"
                                    >
                                        <span className="text-gray-500 text-sm">
                                            {formData.weekly_highlight_image ? formData.weekly_highlight_image.split('/').pop() : 'Clique para carregar foto de destaque...'}
                                        </span>
                                        <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase">
                                            Procurar
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setView('list')}
                                className="btn btn-outline"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isUploading}
                            >
                                {isUploading ? 'Aguarde...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-8 items-baseline">
                    <h1 className="text-3xl text-primary font-serif">Lizzie Admin</h1>
                </div>
                <div className="flex gap-4">
                    <Link href="/loja" className="btn btn-outline">
                        Ver Loja
                    </Link>
                    <button
                        onClick={handleCreate}
                        className="btn btn-primary"
                    >
                        + Novo Artigo
                    </button>
                </div>
            </div>

            <div style={styles.card}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Catálogo de Artigos</h2>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-500">A carregar...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-500 mb-4">Catálogo vazio.</p>
                        <button onClick={handleCreate} className="text-primary underline font-medium">
                            Criar o primeiro artigo
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Artigo</th>
                                    <th style={styles.th}>Nome e Categoria</th>
                                    <th style={styles.th}>Preço</th>
                                    <th style={{ ...styles.th, textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td style={styles.td}>
                                            <div style={styles.imageContainer}>
                                                <Image
                                                    src={getSafeImageSrc(product.image)}
                                                    alt={product.name}
                                                    fill
                                                    style={{ objectFit: 'contain', padding: '0.25rem' }}
                                                />
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div className="font-bold text-gray-800">{product.name}</div>
                                            <div className="text-xs text-secondary font-bold uppercase">{product.type}</div>
                                        </td>
                                        <td style={styles.td}>€{product.price.toFixed(2)}</td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-[#ff85a1] font-bold mr-4 hover:underline"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                Apagar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
