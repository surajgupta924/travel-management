const Loading = ({ message = 'Loading...' }) => (
  <div className="loading">
    <div className="spinner" />
    <p>{message}</p>
  </div>
);

export default Loading;
