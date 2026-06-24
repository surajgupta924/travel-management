import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ message = 'No data found' }) => (
  <div className="empty-state">
    <FiInbox />
    <p>{message}</p>
  </div>
);

export default EmptyState;
