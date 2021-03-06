import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import trackerOperations from '../../redux/tracker/tracker-operations';
import trackerSelectors from '../../redux/tracker/tracker-selectors';

import { ReactComponent as PauseIcon } from '../../assets/icons/pause_circle_outline.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove_circle_outline.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play_circle_outline.svg';

import styles from './TrackList.module.css';

import moment from 'moment';

export default function TrackItem({ idProps, nameProps, startTimeProps, pauseProps, deltaTimeProps, playTimeProps,  onDeleteProps }) {
    const dispatch = useDispatch();
    const trackList = useSelector(trackerSelectors.getTrackerList);
    const [timeCounter, setTimeCounter] = useState('00:00');
    const [hours, setHours] = useState(0);
    const [deltaTime, setDeltaTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if(pauseProps) {
            clearInterval(intervalId);
            return;
        }
        if(deltaTimeProps && !pauseProps) {
            timeCounterFunc(null, deltaTimeProps, playTimeProps);
        } else {
            timeCounterFunc(startTimeProps);
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [pauseProps, deltaTimeProps, playTimeProps]);

    useEffect(() => {
        if(deltaTimeProps && pauseProps) {
            setHours(Math.floor(deltaTimeProps / 3600000));
            setTimeCounter(moment(deltaTimeProps).utc().format('mm:ss'));
        }
        if(deltaTimeProps && !pauseProps) {
            setHours(Math.floor((Date.now() + deltaTimeProps - playTimeProps) / 3600000));
            setTimeCounter(moment(Date.now() + deltaTimeProps - playTimeProps).utc().format('mm:ss'));
        }
    }, [deltaTimeProps, playTimeProps])

    const timeCounterFunc = (start, delta, play) => {
        const timerId = setInterval(() => {
            if(delta) {
                let interval = Date.now() + delta - play;
                setHours(Math.floor(interval / 3600000));
                setTimeCounter(moment(interval).utc().format('mm:ss'));
                setDeltaTime(interval);
            } else {
                let interval = Date.now() - start;
                setHours(Math.floor(interval / 3600000));
                setTimeCounter(moment(interval).utc().format('mm:ss'));
                setDeltaTime(interval);
            }
        }, 1000);
        setIntervalId(timerId);
    };

    const onPauseBtnClick = (trackerId, list, time) => {
        dispatch(trackerOperations.pauseTracker(trackerId, list, time));
    };

    const onPlayBtnClick = (trackerId, list, time) => {
        dispatch(trackerOperations.playTracker(trackerId, list, time));
    };

    return(
        <li className={pauseProps ? styles.listItem : styles.listItemActive}>
            <span className={styles.name}>{nameProps}</span>
            <span className={styles.time}>{hours < 10 ? '0' + hours : hours}:{timeCounter}</span>

            <button type='button' className={styles.button}>
                {pauseProps 
                    ? <PlayIcon className={styles.icon} onClick={() => onPlayBtnClick(idProps, trackList, Date.now())} /> 
                    : <PauseIcon className={styles.icon} onClick={() => onPauseBtnClick(idProps, trackList, deltaTime)} />}
            </button>

            <button type='button' className={styles.button} onClick={onDeleteProps}>
                <RemoveIcon className={styles.removeIcon} />
            </button>
        </li>
    )
}

