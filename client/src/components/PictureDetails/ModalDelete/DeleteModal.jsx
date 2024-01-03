import styles from './DeleteModal.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Path, Notifications } from '../../../constants/constants';
import * as pictureService from '../../../services/pictureService';
import { useEffect, useState } from 'react';

export default function Modal({closeModal, msg}){
    const navigate = useNavigate();
    const [isClosedClick, setIsClosedClick] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const { pictureId } = useParams();
    //const [classVisible, setClassVisible] = useState("modal-container");
    console.log(pictureId);
    console.log(msg)


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