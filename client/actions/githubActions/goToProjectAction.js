export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';

export const loadCurrentProject = (projectId) => ({
  type: SET_CURRENT_PROJECT,
  payload: projectId,
});
