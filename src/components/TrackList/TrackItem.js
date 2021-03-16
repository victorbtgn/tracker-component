import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import trackerOperations from '../../redux/tracker/tracker-operations';
import trackerSelectors from '../../redux/tracker/tracker-selectors';

import { ReactComponent as PauseIcon } from '../../assets/icons/pause_circle_outline.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove_circle_outline.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play_circle_outline.svg';

import styles from './TrackList.module.css';

import moment from 'moment';

export default function TrackItem({ id, name, startTime, pause, onDelete }) {
    const dispatch = useDispatch();
    const trackList = useSelector(trackerSelectors.getTrackerList);
    const [timeCounter, setTimeCounter] = useState('00:00:00');
    const [deltaTime, setDeltaTime] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            if(pause) {
                clearInterval(timerId);
                return;
            }

            let interval = moment() - startTime;
            setTimeCounter(moment(interval).utc().format('HH:mm:ss'));
            setDeltaTime(interval);
        }, 1000);
        return () => {
            clearInterval(timerId);
        }
    }, [timeCounter, pause])

    const onPauseBtnClick = (trackerId, list, time) => {
        dispatch(trackerOperations.pauseTracker(trackerId, list, time));
    };


    return(
        <li className={styles.listItem}>
            <span className={styles.name}>{name}</span>
            <span className={styles.time}>{timeCounter}</span>

            <button type='button' className={styles.button}>
                {pause ? <PlayIcon className={styles.icon} /> : <PauseIcon className={styles.icon} onClick={() => onPauseBtnClick(id, trackList, deltaTime)} />}
            </button>

            <button type='button' className={styles.button} onClick={onDelete}>
                <RemoveIcon className={styles.removeIcon} />
            </button>
        </li>
    )
}

