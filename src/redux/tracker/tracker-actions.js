import { createAction } from '@reduxjs/toolkit';

const addTrackerRequest = createAction('tracker/addTrackerRequest');
const addTrackerSuccess = createAction('tracker/addTrackerSuccess');
const addTrackerError = createAction('tracker/addTrackerError');

const removeTrackerRequest = createAction('tracker/removeTrackerRequest');
const removeTrackerSuccess = createAction('tracker/removeTrackerSuccess');
const removeTrackerError = createAction('tracker/removeTrackerError');

const pauseTrackerRequest = createAction('tracker/pauseTrackerRequest');
const pauseTrackerSuccess = createAction('tracker/pauseTrackerSuccess');
const pauseTrackerError = createAction('tracker/pauseTrackerError');

export default {
    addTrackerRequest,
    addTrackerSuccess,
    addTrackerError,
    removeTrackerRequest,
    removeTrackerSuccess,
    removeTrackerError,
    pauseTrackerRequest,
    pauseTrackerSuccess,
    pauseTrackerError,
}
