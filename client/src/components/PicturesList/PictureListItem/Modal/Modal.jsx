import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import { Path, Notifications } from '../../../../constants/constants';
import { useState } from 'react';

export default function Modal(){
    const navigate = useNavigate();
    const [isClosedClick, setIsClosedClick] = useState(false);
    const [isUpdateClick, setIsUpdateClick] = useState(false);

    const closeModal = () => {
        setIsClosedClick(true);
        navigate(Path.Gallery);
    }

    const updateProfile = () => {
        setIsUpdateClick(true);


        navigate(Path.Profile);
    }

    return (
      <section>
        <Modal />
        {/*{isClosedClick 
        ? <div className={styles["hide-modal"]}></div>
        : <div className={styles["modal-container"]}></div>
        }*/}
        <div className={styles["modal-container"]}>
          <header>
            <h2>Profile created</h2>
          </header>
          <div className={styles["error-msg"]}>
            <p>Do you want to add picture to your profile info?</p>
            </div>
          <footer className={styles["modal-close"]}>
            <button type="button" onClick={updateProfile}>Update</button>
            <button type="button" onClick={closeModal}>Close</button>
          </footer>
        </div>
      </section>
    )
}