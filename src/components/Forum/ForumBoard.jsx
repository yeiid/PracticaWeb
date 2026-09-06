import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header/Header';
import './Forum.css';

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'git', label: 'Git' },
  { value: 'frontend', label: 'HTML/CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'react', label: 'React' },
  { value: 'backend', label: 'Backend' },
];

const PAGE_SIZE = 15;
const REPLIES_PAGE_SIZE = 30;

const ForumBoard = () => {
  const { user, isOffline } = useAuth();
  const [view, setView] = useState('list');

  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'general', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [repliesPage, setRepliesPage] = useState(1);
  const [repliesTotalPages, setRepliesTotalPages] = useState(1);
  const [repliesTotal, setRepliesTotal] = useState(0);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [newReply, setNewReply] = useState('');

  const fetchThreads = useCallback(async (p = page, cat = category) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) });
      if (cat) params.set('category', cat);
      const response = await fetch(`/api/forum/threads?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
        setPage(data.pagination.page);
      }
    } catch (err) {
      console.error('Error fetching threads:', err);
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    if (!isOffline) fetchThreads(1, '');
  }, [isOffline]);

  useEffect(() => {
    if (!isOffline && !showForm) fetchThreads();
  }, [page, category]);

  const switchCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al crear el hilo');
      setSuccess('Tu hilo ha sido publicado. ¡Bienvenido al foro!');
      setFormData({ title: '', category: 'general', content: '' });
      setShowForm(false);
      setPage(1);
      setCategory('');
      fetchThreads(1, '');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenThread = async (threadItem, replyPage = 1) => {
    setThread(threadItem);
    setRepliesPage(replyPage);
    setReplies([]);
    setRepliesTotal(0);
    setRepliesTotalPages(1);
    setNewReply('');
    try {
      const [threadRes, repliesRes] = await Promise.all([
        fetch(`/api/forum/threads/${threadItem.id}`),
        fetch(`/api/forum/threads/${threadItem.id}/replies?page=${replyPage}&limit=${REPLIES_PAGE_SIZE}`),
      ]);
      if (threadRes.ok) setThread(await threadRes.json());
      if (repliesRes.ok) {
        const data = await repliesRes.json();
        setReplies(data.replies);
        setRepliesTotal(data.pagination.total);
        setRepliesTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Error opening thread:', err);
    }
    setView('detail');
  };

  const fetchRepliesPage = async (replyPage) => {
    if (!thread) return;
    setRepliesLoading(true);
    try {
      const response = await fetch(`/api/forum/threads/${thread.id}/replies?page=${replyPage}&limit=${REPLIES_PAGE_SIZE}`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data.replies);
        setRepliesPage(data.pagination.page);
        setRepliesTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Error fetching replies:', err);
    } finally {
      setRepliesLoading(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    try {
      const response = await fetch(`/api/forum/threads/${thread.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newReply }),
      });
      if (response.ok) {
        setNewReply('');
        const lastPage = Math.max(1, Math.ceil((repliesTotal + 1) / REPLIES_PAGE_SIZE));
        await fetchRepliesPage(lastPage);
        const tRes = await fetch(`/api/forum/threads/${thread.id}`);
        if (tRes.ok) setThread(await tRes.json());
        fetchThreads();
      }
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  const handleChangeStatus = async (status) => {
    if (!thread) return;
    try {
      const response = await fetch(`/api/forum/threads/${thread.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updated = await response.json();
        setThread({ ...thread, status: updated.status });
        fetchThreads();
      }
    } catch (err) {
      console.error('Error changing thread status:', err);
    }
  };

  const getCategoryLabel = (val) => CATEGORIES.find(c => c.value === val)?.label || val;

  const getStatusBadge = (status) => {
    const styles = {
      open: { background: '#10b981', color: '#fff' },
      pinned: { background: '#8b5cf6', color: '#fff' },
      closed: { background: '#6b7280', color: '#fff' },
    };
    const labels = { open: 'Abierto', pinned: 'Fijado', closed: 'Cerrado' };
    return <span className="forum-badge" style={styles[status] || styles.open}>{labels[status] || status}</span>;
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
      return iso;
    }
  };

  const getInitials = (name) => (name || '?').charAt(0).toUpperCase();

  if (view === 'detail' && thread) {
    const isOwner = user?.id === thread.user_id;
    const isAdmin = user?.role === 'admin';

    return (
      <div className="page-container">
        <Header />
        <main className="main-content-profile">
          <div className="forum-container">
            <div className="forum-detail">
              <button onClick={() => { setView('list'); setThread(null); fetchThreads(); }} className="action-btn dashboard-btn">
                ← Volver al Foro
              </button>

              <div className="forum-thread-header">
                <h2>{thread.title}</h2>
                <div className="forum-thread-badges">
                  {getStatusBadge(thread.status)}
                  <span className="forum-category-badge">{getCategoryLabel(thread.category)}</span>
                </div>
              </div>

              <div className="forum-post-meta">
                <span className="forum-avatar">{getInitials(thread.author_name)}</span>
                <span>
                  <strong>{thread.author_name}</strong>
                  {thread.author_role === 'admin' && <span className="forum-staff-tag">Soporte</span>}
                </span>
                <span className="forum-meta-sep">·</span>
                <small>{formatDate(thread.created_at)}</small>
              </div>

              <div className="forum-post-body">{thread.content}</div>

              <div className="forum-thread-stats">
                <span>💬 {thread.replies_count} respuestas</span>
                <span>👁 {thread.views_count} vistas</span>
              </div>

              {isOwner && thread.status !== 'closed' && (
                <button onClick={() => handleChangeStatus('closed')} className="action-btn close-btn">
                  Cerrar hilo
                </button>
              )}
              {isOwner && thread.status === 'closed' && (
                <button onClick={() => handleChangeStatus('open')} className="action-btn">
                  Reabrir hilo
                </button>
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleChangeStatus(thread.status === 'pinned' ? 'open' : 'pinned')}
                    className="action-btn"
                  >
                    {thread.status === 'pinned' ? 'Quitar fijado' : 'Fijar hilo'}
                  </button>
                  {thread.status !== 'closed' && (
                    <button onClick={() => handleChangeStatus('closed')} className="action-btn close-btn">
                      Cerrar
                    </button>
                  )}
                </>
              )}

              <div className="forum-replies-section">
                <h3>Respuestas ({repliesTotal})</h3>
                {repliesLoading && <div className="loading">Cargando respuestas...</div>}
                {!repliesLoading && replies.length === 0 && (
                  <div className="empty-state">
                    <p>Aún no hay respuestas. ¡Sé el primero en ayudar!</p>
                  </div>
                )}
                {replies.map(r => (
                  <div key={r.id} className={`forum-reply ${r.is_staff ? 'forum-reply-staff' : ''}`}>
                    <span className="forum-avatar">{getInitials(r.author_name)}</span>
                    <div className="forum-reply-content">
                      <div className="forum-reply-header">
                        <strong>{r.author_name}</strong>
                        {r.is_staff && <span className="forum-staff-tag">Soporte</span>}
                        <small>{formatDate(r.created_at)}</small>
                      </div>
                      <p>{r.content}</p>
                    </div>
                  </div>
                ))}

                {repliesTotalPages > 1 && (
                  <div className="forum-pagination">
                    <button className="forum-page-btn" disabled={repliesPage <= 1} onClick={() => fetchRepliesPage(repliesPage - 1)}>
                      ← Anterior
                    </button>
                    <span>Página {repliesPage} de {repliesTotalPages}</span>
                    <button className="forum-page-btn" disabled={repliesPage >= repliesTotalPages} onClick={() => fetchRepliesPage(repliesPage + 1)}>
                      Siguiente →
                    </button>
                  </div>
                )}

                {thread.status !== 'closed' ? (
                  <form onSubmit={handleSendReply} className="response-form">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Comparte tu respuesta o aporta una solución..."
                      rows={4}
                      required
                    />
                    <button type="submit" className="auth-button primary" disabled={submitting}>
                      {submitting ? 'Enviando...' : 'Responder'}
                    </button>
                  </form>
                ) : (
                  <div className="forum-closed-notice">Este hilo está cerrado. Ya no se aceptan más respuestas.</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isOffline) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content-profile">
          <div className="forum-container">
            <div className="offline-banner" style={{ marginBottom: '1.5rem' }}>
              🚀 Estás en <strong>Modo Demo</strong>. El foro no está disponible sin conexión a la base de datos.
            </div>
            <div className="forum-container">
              <h2>Foro Didáctico</h2>
              <p>Conectate a la base de datos para participar en el foro.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-profile">
        <div className="forum-container">
          <div className="forum-header">
            <div>
              <h2>💬 Foro Didáctico</h2>
              <p className="forum-subtitle">Resuelve dudas, comparte conocimiento y aprende de tus compañeros.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="auth-button primary">
              {showForm ? 'Cancelar' : '📝 Nuevo Hilo'}
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {showForm && (
            <form onSubmit={handleSubmit} className="forum-form">
              <h3>Crear Nuevo Hilo</h3>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  minLength={5}
                  placeholder="Ej: ¿Cómo usar flexbox para centrar un div?"
                />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Contenido:</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Explica tu duda, el contexto y qué has intentado hasta ahora..."
                />
              </div>
              <button type="submit" className="auth-button primary" disabled={submitting}>
                {submitting ? 'Publicando...' : 'Publicar Hilo'}
              </button>
            </form>
          )}

          <div className="forum-category-filter">
            <button
              className={`forum-cat-btn ${category === '' ? 'active' : ''}`}
              onClick={() => switchCategory('')}
            >
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`forum-cat-btn ${category === cat.value ? 'active' : ''}`}
                onClick={() => switchCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="forum-threads-list">
            <h3>{total} {total === 1 ? 'hilo' : 'hilos'}</h3>
            {loading ? (
              <div className="loading">Cargando hilos...</div>
            ) : threads.length === 0 ? (
              <div className="empty-state">
                <p>No hay hilos {category ? 'en esta categoría' : 'aún'}.</p>
                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                  Crear el primer hilo
                </button>
              </div>
            ) : (
              <div className="forum-thread-table">
                {threads.map(t => (
                  <div key={t.id} className="forum-thread-row" onClick={() => handleOpenThread(t)}>
                    <div className="forum-thread-main">
                      <span className="forum-thread-title">{t.title}</span>
                      <small className="forum-thread-author">
                        {t.author_name}
                        {t.author_role === 'admin' && <span className="forum-staff-tag">Soporte</span>}
                        {' · '}{formatDate(t.updated_at)}
                      </small>
                    </div>
                    <div className="forum-thread-side">
                      <div className="forum-thread-tags">
                        {getStatusBadge(t.status)}
                        <span className="forum-category-badge">{getCategoryLabel(t.category)}</span>
                      </div>
                      <div className="forum-thread-stats">
                        <span>💬 {t.replies_count}</span>
                        <span>👁 {t.views_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="forum-pagination">
                <button className="forum-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  ← Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button className="forum-page-btn" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForumBoard;