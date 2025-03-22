const Notification = ({ message }) => (
  <div className={`notification ${message.type}`}>{message.text}</div>
);

export default Notification;
