import React from 'react'
import { observer } from 'mobx-react'
import {useStores} from '../../stores'

// 给原来的组件添加监控
const index = observer(() => {

    const { AuthStore } = useStores();

    return (
        <h1>
            Login: {AuthStore.values.username}
        </h1>
    )
})

export default index;