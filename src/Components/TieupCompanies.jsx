import React from 'react';
import '../assets/Style/TieupCompanies.css';

const companies = [
  { name: 'Mind Path Technology Pvt. Ltd.', logo: 'https://www.mindpathtech.com/wp-content/uploads/2025/05/logo-merge-2-1-1536x298.png' },
  { name: 'YASH Technologies', logo: 'https://logo.clearbit.com/yash.com' },
  { name: 'Systango Technologies Pvt. Ltd.', logo: 'https://logo.clearbit.com/sYstango.com' },
  { name: 'FODUU Web Design Company', logo: 'https://logo.clearbit.com/foduu.com' },
  { name: 'Young Decade IT Software Solution', logo: 'https://logo.clearbit.com/youngdecade.com' },
  { name: 'Cyber Infrastructure (CIS)', logo: 'https://www.cisin.com/images/xlogo_white_1.png.pagespeed.ic.X1qc7N1L7Y.png' },
  { name: 'MindCrew Technologies Pvt. Ltd.', logo: 'https://mindcrewtech.com/MindcrewLogo.png' },
  { name: 'Golden Eagle IT Technologies Pvt. Ltd.', logo: 'https://www.hubdew.com/hubfs/golden-eagle-IT-companies-in-indore.jpg' },
  { name: 'Parkhya Solutions Pvt. Ltd.', logo: 'https://www.hubdew.com/hubfs/parkhya-IT-companies-in-indore.jpg' },
  { name: 'Canopus Infosystems Pvt. Ltd.', logo: 'https://www.hubdew.com/hubfs/canopus-IT-companies-in-indore.png' },
  { name: 'Lemosys Infotech Pvt. Ltd.', logo: 'https://logo.clearbit.com/lemosys.com' },
  { name: 'Samosys Technologies Pvt. Ltd.', logo: 'https://logo.clearbit.com/samosys.com' },
  { name: 'Zehntech Technologies Pvt. Ltd.', logo: 'https://www.zehntech.com/wp-content/uploads/2024/11/Header-Logo.svg' },
];


const TieupCompanies = () => {
  return (
    <section className="tieup-section">
      <h2 className="tieup-title">Our Tie-up Companies</h2>
      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            <img src={company.logo} alt={company.name} className="company-logo" />
            <p className='company-name1'>{company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TieupCompanies;
