import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = ({ items, title = 'Frequently Asked Questions' }) => {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-section">
      <div className="section-header">
        <span className="section-tag">FAQ</span>
        <h2>{title}</h2>
      </div>
      <div className="faq-list">
        {items.map((item, i) => (
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button type="button" className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
              {item.q}
              <FiChevronDown />
            </button>
            {open === i && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
