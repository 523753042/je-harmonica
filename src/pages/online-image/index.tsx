import React, { useEffect, useState } from 'react'
import './index.less'
import { History } from 'History'
import { Input, AutoComplete } from 'antd'
import Http from '../../utils/http';
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators'
const { net } = require('electron').remote;

type Props = {
    history: History
}

const search$ = new Subject<string>();

const OnlineImage: React.FC<Props> = (props) => {
    console.log('props', props);
    const [value, setValue] = useState()
    const [display, setDisplay] = useState('')
    const [optionList, setOptionList] = useState([])

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };
    const onChange = (data: string) => {
        console.log('onChange', data);
    };
    useEffect(() => {
        search$.pipe(
            filter(value => (value.length > 2)),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(keyword => {
            console.log(keyword);
            Http.post('http://bipubipu.com/system/searchAll', JSON.stringify({ keyword })).then((res: any) => {
                console.log(res)
                if (res.score.length > 0) {
                    const tempOptionList = res.score.map(score => ({ value: `${score.name} ${score.alias}`, key: score.id }))
                    setOptionList(tempOptionList)
                }
            })


            Http.get(`https://api.github.com/search/issues?q=${keyword}+state:open+repo:zytx121/je&sort=created&order=desc&access_token=f718051f3f27394eebe655983f69fc1c671f9b10`).then((res: any) => {
                console.log('res', res)
                if (res.items.length > 0) {
                    res.items.forEach(item => {
                        console.log('body', item.body)
                        console.log()
                        setDisplay((item.body as string).split('```')[1])
                    })
                }
            })
        })
    }, [])




    return (
        <div className='online-image-page'>
            {/* <Input.Search onSearch={(e) => {
                console.log(e);
                Http.post('http://bipubipu.com/system/searchAll', JSON.stringify({ keyword: e }))
            }} placeholder='输入关键词' enterButton /> */}
            <AutoComplete
                style={{ width: '100%' }}
                value={value}
                options={optionList}
                onSelect={onSelect}
                onSearch={e => search$.next(e)}
                onChange={onChange}
            ></AutoComplete>
            <div>{display}</div>
        </div>
    )
}

export default OnlineImage