import backBtn from './../../../assets/svg/back.svg'
import { useNavigate } from 'react-router-dom';
import './style.scss'
function UpperBar({children}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(-1)
    }
    return ( 
        <div className="upper-bar">
            <img src={backBtn} alt="" className="upper-bar__button" onClick={handleClick} />
            {children}
        </div>
     );
}

export default UpperBar;