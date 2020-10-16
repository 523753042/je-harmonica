import React from 'react'

import { History } from 'History'

type Props = {
    history: History
}
const PlayMode: React.FC<Props> = (props) => {
    console.log('props', props)
    return (
        <>
            <div style={{ color: '#66ccff' }} onClick={() => {
                props.history.push({
                    pathname: '/home',
                })
            }} >PlayMode</div>

        </>
    )
}

export default PlayMode