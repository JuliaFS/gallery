import styles from './DeleteModal.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Path, Notifications } from '../../../constants/constants';
import * as pictureService from '../../../services/pictureService';

export default function Modal({closeModal, msg}){
    const navigate = useNavigate();
    const { pictureId } = useParams();


    const closeErrorModal = () => {
      closeModal(false);
    }

    const deleteErrorModal = async () => {
        await pictureService.remove(pictureId);
        navigate(Path.Gallery);

    }
    return (
      <section>
          <div className={styles["modal-container"]}>
          <header>
            <h2>Delete Confirmation</h2>
          </header>
          <div className={styles["error-msg"]}>
            <p>{msg.message}</p>
            </div>
          <footer className={styles["modal-close"]}>
            <button type="button" onClick={closeErrorModal}>Close</button>
            <button type="button" onClick={deleteErrorModal}>Delete</button>
          </footer>
        </div>
      </section>
    )
}