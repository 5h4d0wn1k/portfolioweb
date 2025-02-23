import React, { useEffect, useState } from 'react';
import { fetchData } from '../../lib/fetchData';

const MainPage = () => {
  const [data, setData] = useState({ experiences: [], education: [], projects: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Experiences</h1>
      <ul>
        {data.experiences.map((exp) => (
          <li key={exp.id}>{exp.company} - {exp.position}</li>
        ))}
      </ul>

      <h1>Education</h1>
      <ul>
        {data.education.map((edu) => (
          <li key={edu.id}>{edu.institution} - {edu.degree}</li>
        ))}
      </ul>

      <h1>Projects</h1>
      <ul>
        {data.projects.map((proj) => (
          <li key={proj.id}>{proj.title} - {proj.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage; 