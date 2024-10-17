import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';


import ApplicationLayout from '@/app/application-layout';
import Toast from '@/components/custom/Toast';
import HomeDashboard from '@/app/page';

export default function App() {
  return (
    <ApplicationLayout>
      <Toast />
      <Router>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
        </Routes>
      </Router>
    </ApplicationLayout>
  );
}
