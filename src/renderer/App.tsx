import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import ApplicationLayout from '@/app/application-layout';
import Toast from '@/components/custom/Toast';
import HomeDashboard from '@/app/Dashboard';
import ProjectsPage from '@/app/projects/ProjectsPage';
import ProjectPage from '@/app/projects/ProjectPage';

export default function App() {
  return (
    <ApplicationLayout>
      <Toast />
      <Router>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </ApplicationLayout>
  );
}
