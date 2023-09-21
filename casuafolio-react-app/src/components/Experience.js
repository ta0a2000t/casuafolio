import React from 'react';

const Experience = ({ experience }) => {
  return (
    <div>
      <h3>{experience.role}</h3>
      <p>{experience.company}, {experience.year}</p>
    </div>
  );
};

export default Experience;
