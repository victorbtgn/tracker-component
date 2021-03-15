import styles from './TrackEditor.module.css';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import trackerOperations from '../../redux/tracker/tracker-operations';
import trackerSelectors from '../../redux/tracker/tracker-selectors';
import { ReactComponent as PlayArrowIcon } from '../../assets/icons/play_arrow.svg';

export default function TrackEditor() {
    const dispatch = useDispatch();
    const trackerList = useSelector(trackerSelectors.getTrackerList);
    const [name, setName] = useState('');

    const handleChange = useCallback(evt => {
        const { value } = evt.target;
        
        if(!value || (value.length === 1 && value.charCodeAt(0) === 32)) {
            setName('');
        } else {
            setName(value);
        }
    }, []);

    const handleSubmit = evt => {
        evt.preventDefault();
        const trackerId = trackerList.length ? trackerList[trackerList.length - 1].id + 1 : 1;
        dispatch(trackerOperations.addTracker(name, trackerId));
        setName('');
    };

    return(
        <form className={styles.form} onSubmit={handleSubmit} >
            <input
                autoFocus
                autoComplete='off'
                name='name'
                className={styles.input}
                onChange={handleChange}
                value={name}
                placeholder='Enter tracker name' />
            <button className={styles.button} type='submit' >
                <PlayArrowIcon className={styles.icon} />
            </button>
        </form>
    )
}
