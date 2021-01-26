import React from 'react'
import {observer} from 'mobx-react'
import { useStores } from '../stores'

const Home = observer((params) => {

    const { UserStore } = useStores();
    
    return (
        <React.Fragment>
            <h2>
                hello
                {
                    UserStore.currentUser ? 
                        <>,{UserStore.currentUser.attributes.username}</>:
                        <>, 陌生人</>
                }
            </h2>

        </React.Fragment>
    )
});

export default Home;