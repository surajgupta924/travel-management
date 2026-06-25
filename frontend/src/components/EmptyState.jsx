import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ message = 'No data found', children }) => (
  <div className="empty-state">
    <div className="empty-icon"><FiInbox /></div>
    <p>{message}</p>
    {children}
  </div>
);

export default EmptyState;
