import styles from './ModalErrors.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Path } from '../../constants/constants';

export default function Modal(error){
    const navigate = useNavigate();

    const closeErrorModal = () => {
        console.log('inside closeErrorModal');
        //<Navigate to={Path.Login}` />
        //navigate(Path.Login);
        navigate(-1);
    }
    return (
      <section>
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