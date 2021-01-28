import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd'
import styled from 'styled-components'
import ResultLink from './ResultLink'

import { useStores } from '../stores'

const historyList = observer(() => {

    const { HistoryStore } = useStores();

    const loadMore = () => {
        HistoryStore.find();
    }

    const MyListItem = styled(List.Item)`
        border-top: 1px solid #ddd;
        text-align: left;
    `

    useEffect(() => {
        console.log('进入')
        return () => {
            HistoryStore.reset();
        };
    }, []);

    return (
        <>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={true}
            >
                <ul>
                    {
                        HistoryStore.list.map((item) => {
                            return <li key={item.id}>
                                <ResultLink url={item.attributes.url.attributes.url} />
                                {HistoryStore.isLoading && HistoryStore.hasMore && (
                                    <div>
                                        <Spin thp="加载中..." />
                                    </div>
                                )}
                            </li>
                        })
                    }
                </ul>
                
            </InfiniteScroll>
        </>
    )
})

export default historyList;