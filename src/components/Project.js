import React from 'react';

const Project = ({ project }) => {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
};

export default Project;
