import trackerActions from './tracker-actions';

const addTracker = (name, id) => async dispatch => {
    dispatch(trackerActions.addTrackerRequest);

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
    dispatch(trackerActions.removeTrackerRequest);

    try {
        dispatch(trackerActions.removeTrackerSuccess(id))
    } catch (error) {
        dispatch(trackerActions.removeTrackerError(error.message))
    }
}

export default { addTracker, removeTracker };
