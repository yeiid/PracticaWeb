import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header/Header';
import './Support.css';

const SupportCenter = () => {
  const { user, isOffline } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'normal'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isOffline) {
      fetchTickets();
    } else {
      setLoading(false);
    }
  }, [isOffline]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al crear ticket');

      setSuccess('Tu ticket ha sido creado correctamente. Te responderemos pronto.');
      setFormData({ subject: '', message: '', category: 'general', priority: 'normal' });
      setShowForm(false);
      fetchTickets();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
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
    }
  };

  const handleCloseTicket = async (ticketId) => {
    if (window.confirm('¿Deseas cerrar este ticket?')) {
      try {
        await fetch(`/api/tickets/${ticketId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'closed' }),
        });
        fetchTickets();
        if (viewingTicket?.id === ticketId) handleViewTicket({ ...viewingTicket, status: 'closed' });
      } catch (err) {
        console.error('Error closing ticket:', err);
      }
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
    const labels = { general: 'General', technical: 'Tecnico', billing: 'Facturacion', question: 'Pregunta', bug: 'Error/Bug' };
    return labels[cat] || cat;
  };

  if (viewingTicket) {
    return (
      <div className="page-container">
        <Header />
        <main className="main-content-profile">
          <div className="support-detail">
            <button onClick={() => { setViewingTicket(null); setResponses([]); }} className="action-btn dashboard-btn">
              ← Volver a Mis Tickets
            </button>

            <div className="ticket-detail-header">
              <h2>{viewingTicket.subject}</h2>
              <div className="ticket-badges">
                {getStatusBadge(viewingTicket.status)}
                {getPriorityBadge(viewingTicket.priority)}
                <span className="ticket-category">{getCategoryLabel(viewingTicket.category)}</span>
              </div>
            </div>

            <div className="ticket-original-message">
              <p><strong>Tu mensaje:</strong></p>
              <p>{viewingTicket.message}</p>
              <small>{new Date(viewingTicket.created_at).toLocaleString('es-ES')}</small>
            </div>

            <div className="ticket-responses">
              <h3>Respuestas ({responses.length})</h3>
              {responses.map(r => (
                <div key={r.id} className={`response-item ${r.is_staff ? 'staff-response' : 'user-response'}`}>
                  <div className="response-header">
                    <strong>{r.is_staff ? '🛡️ Soporte' : 'Tu respuesta'}</strong>
                    <small>{new Date(r.created_at).toLocaleString('es-ES')}</small>
                  </div>
                  <p>{r.message}</p>
                </div>
              ))}

              {(viewingTicket.status === 'open' || viewingTicket.status === 'in_progress' || viewingTicket.status === 'resolved') && (
                <form onSubmit={handleSendResponse} className="response-form">
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    required
                  />
                  <button type="submit" className="auth-button primary" disabled={submitting}>
                    {submitting ? 'Enviando...' : 'Enviar Respuesta'}
                  </button>
                </form>
              )}
            </div>

            {viewingTicket.status !== 'closed' && (
              <button onClick={() => handleCloseTicket(viewingTicket.id)} className="action-btn close-btn">
                Cerrar Ticket
              </button>
            )}
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
          <div className="support-container">
            <div className="offline-banner" style={{ marginBottom: '1.5rem' }}>
              🚀 Estás en <strong>Modo Demo</strong>. El sistema de soporte no está disponible sin conexión a la base de datos.
            </div>
            <div className="support-container">
              <h2>Centro de Soporte</h2>
              <p>Conectate a la base de datos para poder crear y gestionar tickets.</p>
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
        <div className="support-container">
          <div className="support-header">
            <h2>Centro de Soporte</h2>
            <button onClick={() => setShowForm(!showForm)} className="auth-button primary">
              {showForm ? 'Cancelar' : '✉️ Nuevo Ticket'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="ticket-form">
              <h3>Crear Nuevo Ticket</h3>
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}

              <div className="form-group">
                <label>Asunto:</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  placeholder="Describe brevemente tu consulta o problema"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoria:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="technical">Tecnico</option>
                    <option value="question">Pregunta</option>
                    <option value="bug">Error/Bug</option>
                    <option value="billing">Facturacion</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prioridad:</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Baja</option>
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Mensaje:</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  placeholder="Describe tu problema o consulta en detalle..."
                />
              </div>

              <button type="submit" className="auth-button primary" disabled={submitting}>
                {submitting ? 'Creando...' : 'Crear Ticket'}
              </button>
            </form>
          )}

          <div className="tickets-list">
            <h3>Mis Tickets ({tickets.length})</h3>
            {loading ? (
              <div className="loading">Cargando tickets...</div>
            ) : tickets.length === 0 ? (
              <div className="empty-state">
                <p>No tienes tickets aun.</p>
                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                  Crear mi primer ticket
                </button>
              </div>
            ) : (
              <div className="tickets-table">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="ticket-row" onClick={() => handleViewTicket(ticket)}>
                    <div className="ticket-row-left">
                      <span className="ticket-subject">{ticket.subject}</span>
                      <small>{getCategoryLabel(ticket.category)} - {new Date(ticket.created_at).toLocaleDateString('es-ES')}</small>
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
        </div>
      </main>
    </div>
  );
};

export default SupportCenter;
