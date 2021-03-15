import styles from './TrackList.module.css';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause_circle_outline.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove_circle_outline.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play_circle_outline.svg';

export default function TrackItem({ name, startTime, pause, onDelete }) {
    return(
        <li className={styles.listItem}>
            <span className={styles.name}>{name}</span>
            <span className={styles.time}>60:60:60</span>

            <button type='button' className={styles.button}>
                {pause ? <PauseIcon className={styles.icon} /> : <PlayIcon className={styles.icon} />}
            </button>

            <button type='button' className={styles.button} onClick={onDelete}>
                <RemoveIcon className={styles.removeIcon} />
            </button>
        </li>
    )
}

