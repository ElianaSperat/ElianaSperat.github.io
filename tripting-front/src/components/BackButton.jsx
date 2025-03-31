import { useNavigate } from 'react-router-dom';
import backArrow from '../assets/back-arrow.png';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className="back-button">
            <img src={backArrow} alt="Volver atrás" className="back-arrow" />
        </button>
    );
};

export default BackButton;