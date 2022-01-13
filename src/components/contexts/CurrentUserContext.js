import {createContext} from 'react';

const CurrentUserContext = createContext({
    currentUser: null,
    // eslint-disable-next-line no-unused-vars
    setCurrentUser: (user) => {},
});

export default CurrentUserContext;
