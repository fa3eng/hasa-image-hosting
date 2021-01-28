import React from 'react'
import {observer} from 'mobx-react'
import styled, {keyframes} from 'styled-components'
import { useStores } from '../stores'

import Uploader from '../components/Uploader'
import Tips from '../components/Welcome'

const Home = observer((params) => {

    // 淡入动画效果, styled-components 暴露出的API
    const fade = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
    `

    const Home = styled.div`
        animation: ${fade} 1500ms ease;
    `
    const {UserStore} = useStores();

    return (
        <Home>
            {
                UserStore.currentUser ? <Uploader /> : <Tips />
            }
        </Home>
    )
});

export default Home;