import { FETCHING_REPOS, SUCCESS_GETTING_REPOS, FAILURE_GETTING_REPOS } from '../../actions/githubActions/getRepoActions';
import { SET_CURRENT_PROJECT } from '../../actions/githubActions/goToProjectAction';

const initialState = {
  fetchingRepos: false,
  fetchedRepos: false,
  userRepos: [],
  errorMessage: '',
  currentProject: {},
};
function updateCurrentProject(array, projectId) {
  const updatedCurrentProject = array.filter((project) => {
    // console.log(' WHAT ARE THE PROJECTS IN MAP????', project.id, projectId);
    if (project.id === projectId) {
      // Since we only want to update one item, preserve all others as they are now
      return project;
    }
  });

  return updatedCurrentProject;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPOS:
      return Object.assign({}, state, { fetchingRepos: true });
    case SUCCESS_GETTING_REPOS: {
      // console.info('What are the reducers repos', action.payload, )
      return Object.assign({}, state, { userRepos: action.payload.repos, fetchedRepos: true, currentProject: action.payload.repos[0] });
    }
    case FAILURE_GETTING_REPOS:
      return Object.assign({}, state, { errorMessage: action.payload.err });

    case SET_CURRENT_PROJECT:
    // console.log('project ID in case statement from reducer', action.payload);
      // console.log('repoID', action.payload., 'userRepos STate', state.userRepos);
      const projId = action.payload;
      const newCurrentProject = updateCurrentProject(state.userRepos, projId);
      console.log('NEW CURRENT PROJ IN REDUCER', newCurrentProject);
      return Object.assign({}, state, { currentProject: newCurrentProject[0] });
    default:
      return { ...state };
  }
}
