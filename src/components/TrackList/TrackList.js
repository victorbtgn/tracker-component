import styles from './TrackList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import trackerOperations from '../../redux/tracker/tracker-operations';
import trackerSelectors from '../../redux/tracker/tracker-selectors';
import TrackItem from './TrackItem';

export default function TrackList() {
    const dispatch = useDispatch();
    const trackList = useSelector(trackerSelectors.getTrackerList);

    const onRemoveTracker = trackerId => dispatch(trackerOperations.removeTracker(trackerId));

    return(
        <ul className={styles.list}>
            {trackList.map(({ id, name, startTime, pause }) => <TrackItem key={id} name={name} startTime={startTime} pause={pause} onDelete={() => onRemoveTracker(id)} />)}
        </ul>
    )
}
