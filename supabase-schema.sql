-- ============================================
-- Schema para Academia Web en Supabase
-- ============================================

-- Tabla de progreso de usuarios
CREATE TABLE IF NOT EXISTS progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  progress_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Tabla de certificados
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates(course_id);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Habilitar RLS en las tablas
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla progress
-- Los usuarios solo pueden ver y modificar su propio progreso
CREATE POLICY "Users can view their own progress"
  ON progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
  ON progress FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para la tabla certificates
-- Los usuarios solo pueden ver sus propios certificados
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
  ON certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own certificates"
  ON certificates FOR DELETE
  USING (auth.uid() = user_id);

-- Habilitar RLS en la tabla courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla courses
-- Todos los usuarios autenticados pueden ver cursos activos
CREATE POLICY "Users can view active courses"
  ON courses FOR SELECT
  USING (auth.role() = 'authenticated' AND active = true);

-- Solo administradores pueden insertar/editar cursos (por simplicidad, todos los usuarios autenticados por ahora)
CREATE POLICY "Users can manage courses"
  ON courses FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================
-- Función para actualizar updated_at automáticamente
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en progress
DROP TRIGGER IF EXISTS update_progress_updated_at ON progress;
CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Datos de ejemplo (opcional)
-- ============================================

-- Tabla de cursos disponibles en la plataforma
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  slides INTEGER NOT NULL,
  url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(active);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at);

-- Trigger para actualizar updated_at en courses
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Datos de ejemplo (opcional)
-- ============================================

-- Insertar cursos de ejemplo
INSERT INTO courses (title, description, icon, color, slides, url) VALUES
('HTML5', 'Aprende los fundamentos del lenguaje de marcado que estructura el contenido web.', '📄', '#e34f26', 7, '/HTML/'),
('CSS3', 'Domina el arte del diseño web con estilos modernos y layouts avanzados.', '🎨', '#1572b6', 8, '/CSS/'),
('JavaScript', 'Haz que tus páginas cobren vida con programación interactiva moderna.', '⚡', '#f7df1e', 11, '/JS/'),
('Python', 'Aprende el lenguaje de programación más versátil para datos, web y automatización.', '🐍', '#3776ab', 10, '/Python/')
ON CONFLICT DO NOTHING;
"html": {"completed": 5, "total": 7}, "css": {"completed": 3, "total": 8}}'::jsonb);
