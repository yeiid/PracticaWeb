// Datos de prueba para cuando la base de datos está offline
export const mockCourses = [
  {
    id: '1',
    title: 'Git Master (Offline)',
    description: 'Aprende los fundamentos de Git (Modo de vista previa).',
    icon: '🧡',
    color: '#f97316',
    slides: 7,
    url: '/git',
    active: true
  },
  {
    id: '2',
    title: 'Backend Pro (Offline)',
    description: 'Introducción al desarrollo del lado del servidor.',
    icon: '⚙️',
    color: '#6366f1',
    slides: 7,
    url: '/backend',
    active: true
  }
];

export const mockUser = {
  id: 'mock-id',
  email: 'invitado@academia.dev',
  full_name: 'Estudiante Invitado',
  role: 'student'
};
