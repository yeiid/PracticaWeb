import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header/Header';
import './../../components/Admin/CourseAdmin.css';

const AdminTickets = () => {
  const { user, isOffline } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewingTicket, setViewingTicket] = useState(null);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user && user.role !== 'admin' && !isOffline) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content-profile">
          <div className="admin-tickets-container">
            <h2>🛡️ Acceso Denegado</h2>
            <p>No tienes permisos de administrador para acceder a esta seccion.</p>
            <a href="/dashboard" className="btn btn-primary">Volver al Dashboard</a>
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
          <div className="admin-tickets-container">
            <div className="offline-banner" style={{ marginBottom: '1.5rem' }}>
              🚀 Estás en <strong>Modo Demo</strong>. El panel de administracion no está disponible sin conexión.
            </div>
          </div>
        </main>
      </div>
    );
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = async (ticket) => {
    setViewingTicket(ticket);
    try {
      const response = await fetch(`/api/tickets/${ticket.id}/responses`);
      if (response.ok) {
        const data = await response.json();
        setResponses(data.responses || []);
      }
    } catch (err) {
      console.error('Error fetching responses:', err);
    }
  };

  const handleSendResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;
    setSubmitting(true);

    try {
      const response = await fetch(`/api/tickets/${viewingTicket.id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newResponse }),
      });

      if (response.ok) {
        setNewResponse('');
        handleViewTicket(viewingTicket);
        fetchTickets();
      }
    } catch (err) {
      console.error('Error sending response:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchTickets();
        if (viewingTicket?.id === ticketId) {
          setViewingTicket({ ...viewingTicket, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      open: { background: '#f59e0b', color: '#000' },
      in_progress: { background: '#3b82f6', color: '#fff' },
      resolved: { background: '#10b981', color: '#fff' },
      closed: { background: '#6b7280', color: '#fff' },
    };
    const labels = { open: 'Abierto', in_progress: 'En Progreso', resolved: 'Resuelto', closed: 'Cerrado' };
    return <span className="ticket-status-badge" style={styles[status] || styles.open}>{labels[status] || status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      low: { background: '#6b7280', color: '#fff' },
      normal: { background: '#3b82f6', color: '#fff' },
      high: { background: '#f59e0b', color: '#000' },
      urgent: { background: '#ef4444', color: '#fff' },
    };
    const labels = { low: 'Baja', normal: 'Normal', high: 'Alta', urgent: 'Urgente' };
    return <span className="ticket-priority-badge" style={styles[priority] || styles.normal}>{labels[priority] || priority}</span>;
  };

  const getCategoryLabel = (cat) => {
    const labels = { general: 'General', technical: 'Tecnico', billing: 'Facturacion', question: 'Pregunta', bug: 'Bug' };
    return labels[cat] || cat;
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  if (viewingTicket) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content-profile">
          <div className="admin-ticket-detail">
            <button onClick={() => { setViewingTicket(null); setResponses([]); }} className="action-btn dashboard-btn">
              ← Volver a Lista de Tickets
            </button>

            <div className="ticket-detail-header">
              <h2>{viewingTicket.subject}</h2>
              <div className="ticket-badges">
                {getStatusBadge(viewingTicket.status)}
                {getPriorityBadge(viewingTicket.priority)}
                <span className="ticket-category">{getCategoryLabel(viewingTicket.category)}</span>
              </div>
              <div className="ticket-user-info">
                <span>👤 {viewingTicket.user_name || viewingTicket.user_email}</span>
                <span>📧 {viewingTicket.user_email}</span>
                <span>📅 {new Date(viewingTicket.created_at).toLocaleString('es-ES')}</span>
              </div>
            </div>

            <div className="ticket-original-message">
              <p><strong>Mensaje del usuario:</strong></p>
              <p>{viewingTicket.message}</p>
            </div>

            <div className="ticket-responses">
              <h3>Respuestas ({responses.length})</h3>
              {responses.map(r => (
                <div key={r.id} className={`response-item ${r.is_staff ? 'staff-response' : 'user-response'}`}>
                  <div className="response-header">
                    <strong>{r.is_staff ? '🛡️ Soporte' : '👤 Usuario'}</strong>
                    <small>{r.responder_name || r.responder_email || 'Sistema'} - {new Date(r.created_at).toLocaleString('es-ES')}</small>
                  </div>
                  <p>{r.message}</p>
                </div>
              ))}

              <form onSubmit={handleSendResponse} className="response-form">
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder="Escribe una respuesta al usuario..."
                  required
                />
                <button type="submit" className="auth-button primary" disabled={submitting}>
                  {submitting ? 'Enviando...' : 'Enviar Respuesta'}
                </button>
              </form>
            </div>

            <div className="ticket-actions-admin">
              <h4>Cambiar Estado:</h4>
              <div className="status-buttons">
                {['open', 'in_progress', 'resolved', 'closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(viewingTicket.id, status)}
                    className={`status-btn ${viewingTicket.status === status ? 'active' : ''}`}
                    style={viewingTicket.status === status ? { background: status === 'open' ? '#f59e0b' : status === 'in_progress' ? '#3b82f6' : status === 'resolved' ? '#10b981' : '#6b7280', color: '#fff' } : {}}
                  >
                    {status === 'open' ? 'Abierto' : status === 'in_progress' ? 'En Progreso' : status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                  </button>
                ))}
              </div>
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
        <div className="admin-tickets-container">
          <h2>🛡️ Panel de Soporte - Administracion</h2>

          <div className="ticket-stats">
            <div className="stat-card"><span>{stats.total}</span><small>Total</small></div>
            <div className="stat-card stat-open"><span>{stats.open}</span><small>Abiertos</small></div>
            <div className="stat-card stat-progress"><span>{stats.in_progress}</span><small>En Progreso</small></div>
            <div className="stat-card stat-resolved"><span>{stats.resolved}</span><small>Resueltos</small></div>
            <div className="stat-card stat-closed"><span>{stats.closed}</span><small>Cerrados</small></div>
          </div>

          <div className="filter-bar">
            <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>Todos</button>
            <button onClick={() => setFilter('open')} className={`filter-btn ${filter === 'open' ? 'active' : ''}`}>Abiertos</button>
            <button onClick={() => setFilter('in_progress')} className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}>En Progreso</button>
            <button onClick={() => setFilter('resolved')} className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}>Resueltos</button>
            <button onClick={() => setFilter('closed')} className={`filter-btn ${filter === 'closed' ? 'active' : ''}`}>Cerrados</button>
          </div>

          {loading ? (
            <div className="loading">Cargando tickets...</div>
          ) : filteredTickets.length === 0 ? (
            <div className="empty-state">
              <p>No hay tickets en esta categoria.</p>
            </div>
          ) : (
            <div className="tickets-table">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="ticket-row" onClick={() => handleViewTicket(ticket)}>
                  <div className="ticket-row-left">
                    <span className="ticket-id">#{ticket.id.slice(0, 8)}</span>
                    <span className="ticket-subject">{ticket.subject}</span>
                    <small className="ticket-user">{ticket.user_name || ticket.user_email}</small>
                  </div>
                  <div className="ticket-row-center">
                    <span className="ticket-category">{getCategoryLabel(ticket.category)}</span>
                    <small>{new Date(ticket.created_at).toLocaleDateString('es-ES')}</small>
                  </div>
                  <div className="ticket-row-right">
                    {getPriorityBadge(ticket.priority)}
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTickets;
