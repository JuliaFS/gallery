import styles from './ModalErrors.module.css';
import { useNavigate } from 'react-router-dom';
import { Path, Notifications } from '../../constants/constants';
import { useState } from 'react';

export default function Modal(error){
    const navigate = useNavigate();
    const [isClosedClick, setIsClosedClick] = useState(false);

    const closeErrorModal = () => {
        console.log('inside closeErrorModal');
        setIsClosedClick(true);
        navigate(0);
    }
    return (
      <section>
        {isClosedClick 
        ? <div className={styles["hide-modal"]}></div>
        : <div className={styles["modal-container"]}></div>
        }
        <div className={styles["modal-container"]}>
          <header>
            <h2>Error</h2>
          </header>
          <div className={styles["error-msg"]}>
            <p>{error.message}</p>
            </div>
          <footer className={styles["modal-close"]}>
            <button type="button" onClick={closeErrorModal}>close</button>
          </footer>
        </div>
      </section>
    )
}