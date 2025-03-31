const Alert = ({ variant = 'danger', children }) => (
    <div className={`alert alert-${variant}`}>
        {children}
    </div>
);

export default Alert;