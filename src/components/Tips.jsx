import React from 'react'
import {observer} from 'mobx-react'

import {useStores} from '../stores'

const Tips = observer(() => {

    const {UserStore} = useStores();

    return (
        <>
            你好
            {
                UserStore.currentUser ? 
                <>,{UserStore.currentUser.attributes.username}, 开始干活吧~</>:
                <>,陌生人, 请你先登录/注册</>
            }
        </>
    )
})

export default Tips;
