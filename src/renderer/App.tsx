import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import ApplicationLayout from '@/app/application-layout';
import Toast from '@/components/custom/Toast';
import HomeDashboard from '@/app/Dashboard';
import ProjectsPage from '@/app/projects/ProjectsPage';
import ProjectPage from '@/app/projects/ProjectPage';
import FlowsPage from '@/app/flows/FlowPage';
import './App.css';

export default function App() {
  return (
    <>
      <Toast />
      <Router>
        <ApplicationLayout>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/flows" element={<FlowsPage />} />
          </Routes>
        </ApplicationLayout>
      </Router>
    </>
  );
}
