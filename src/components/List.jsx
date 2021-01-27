import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd'

import { useStores } from '../stores'

const historyList = observer(() => {

    const { HistoryStore } = useStores();

    const loadMore = () => {
        HistoryStore.find();
    }

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
                <List
                    dataSource={HistoryStore.list}
                    renderItem={
                        item => <List.Item key={item.id}>
                                <img src={item.attributes.url.attributes.url} alt="" style={{ height: '100px' }} />
                                <h5>{item.attributes.filename}</h5>
                                <a href={item.attributes.url.attributes.url} target="_blank" rel="noreferrer">链接</a>
                                </List.Item>
                        
                    }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin thp="加载中" />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </>
    )
})

export default historyList;