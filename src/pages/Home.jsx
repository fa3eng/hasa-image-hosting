import React from 'react'
import {observer} from 'mobx-react'

import Uploader from '../components/Uploader'
import Tips from '../components/Tips'

const Home = observer((params) => {
    
    return (
        <React.Fragment>
            <h2>
                <Tips />
            </h2>
            <Uploader />
        </React.Fragment>
    )
});

export default Home;