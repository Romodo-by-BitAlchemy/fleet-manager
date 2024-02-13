// DashboardPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { text } = useParams();

  return (
    <div>
      {text && (
        <h1>{text} Page</h1>
        // ... Add more content specific to the section
      )}
      {/* Add your specific content for the Dashboard section here */}
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default DashboardPage;
