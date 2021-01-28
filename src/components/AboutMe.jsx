import React from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const Tips = observer(() => {

    const AboutMe = styled.article`
        padding: 20px 40px;
        background-color: #fff;
        border-radius: 10px;
        font-size: 15px;
    `

    return (
        <AboutMe>
            <p>hello，这里是方阿森。</p>
            <p>目前大四，就读于内蒙古科技大学软件工程专业。对前端方向比较感兴趣，想从事前端开发。</p>
            <p>这是一个简单的图床，实现了用户的登录，注册，以及上传图片等基本的功能。</p>
            <p>这个项目使用React+React-Router+styled-components+Ant Design来组织页面，使用Mobx管理状态，LeanCloud作为后端保存数据。</p>
            <p>来试一试吧～ 注册/登录</p>
        </AboutMe>
    )
})

export default Tips;
