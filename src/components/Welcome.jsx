import React from 'react'
import {observer} from 'mobx-react'
import styled from "styled-components";

import Start from './Start'

const Welcome = observer(() => {

    const Title = styled.p`
        font-size: 70px;
        letter-spacing: 40px;
        line-height: 90px;
        margin-bottom: 0.5em;
    `

    const SubTitle = styled.p`
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 10px;
        color: #9e9e9e;
    `

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        height: 70vh;
        justify-content: center;
        align-items: center;
    `

    return (
        <Container>
            <Title>有一个图床</Title>
            <SubTitle>一个简单的图床</SubTitle>
            <Start/>
        </Container>
    )
})

export default Welcome;
