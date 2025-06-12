import React from 'react';
import '../assets/Style/TieupCompanies.css';

const companies = [
  { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
  { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
  { name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
  { name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
  { name: 'Tech Mahindra', logo: 'https://logo.clearbit.com/techmahindra.com' },
  { name: 'HCL', logo: 'https://logo.clearbit.com/hcltech.com' },
];

const TieupCompanies = () => {
  return (
    <section className="tieup-section">
      <h2 className="tieup-title">Our Tie-up Companies</h2>
      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            <img src={company.logo} alt={company.name} className="company-logo" />
            <p className='text-dark'>{company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TieupCompanies;
