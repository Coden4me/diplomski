const Alert = ({ message, type, cb }) => (
    <div onClick={cb} className={`alert ${type}`}>
        <p>{message}</p>
        <button onClick={cb}>X</button>
    </div>
);

export default Alert;