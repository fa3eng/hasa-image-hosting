import React from 'react'
import List from '../components/List'
import styled, {keyframes} from 'styled-components'

export default function History() {

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

    const History = styled.div`
        animation: ${fade} 1500ms ease;
    `

    return (
        <History>
            <h1>上传历史</h1>
            <List />
        </History>
    )
}
