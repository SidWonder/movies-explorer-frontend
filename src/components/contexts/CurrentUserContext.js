import {createContext} from 'react';

const CurrentUserContext = createContext({
    currentUser: null,
    setCurrentUser: (user) => {},
});

export default CurrentUserContext;