import trackerActions from './tracker-actions';

const addTracker = (name, id) => async dispatch => {
    dispatch(trackerActions.addTrackerRequest());

    const tracker = {
        id,
        name: name ? name : `No name tracker #${id}`,
        startTime: Date.now(),
        pause: false,
    }

    try {
        dispatch(trackerActions.addTrackerSuccess(tracker));
    } catch (error) {
        dispatch(trackerActions.addTrackerError(error.message));  
    };
};

const removeTracker = id => async dispatch => {
    dispatch(trackerActions.removeTrackerRequest());

    try {
        dispatch(trackerActions.removeTrackerSuccess(id))
    } catch (error) {
        dispatch(trackerActions.removeTrackerError(error.message))
    }
}

const pauseTracker = (id, trackerList, deltaTime) => async dispatch => {
    dispatch(trackerActions.pauseTrackerRequest())

    try {
        const newTrackerList = trackerList.map(tracker => {
            if(id === tracker.id) return { ...tracker, pause: true, deltaTime };
            return tracker;
        })
        dispatch(trackerActions.pauseTrackerSuccess(newTrackerList));
    } catch (error) {
        dispatch(trackerActions.pauseTrackerError(error.message))
    }
};

const playTracker = (id, trackerList, playTime) => async dispatch =>  {
    dispatch(trackerActions.playTrackerRequest());

    try {
        const newTrackerList = trackerList.map(tracker => {
            if(id === tracker.id) return { ...tracker, pause: false, playTime };
            return tracker;
        })
        dispatch(trackerActions.playTrackerSuccess(newTrackerList));
    } catch (error) {
        dispatch(trackerActions.playTrackerError(error.message));
    }
};

export default { addTracker, removeTracker, pauseTracker, playTracker };
