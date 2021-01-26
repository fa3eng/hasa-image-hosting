import { createContext, useContext} from 'react';
import AuthStore from './auth'
import UserStore from './user'

const context = createContext({
    AuthStore,
    UserStore
});

const useStores = () => useContext(context);

export {useStores};