import React, { useState } from 'react'
import './index.less'
import { History } from 'History'
import Transcore from 'je-transcore';
import { Input, Tabs, Select, Button, Radio, } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { CHANGVALUELIST } from '../../models'
type Props = {
    history: History
}

const Home: React.FC<Props> = (props) => {
    console.log('props', props);
    const [orivalue, setOriValue] = useState('1234567');
    const [targetvalue, setTargetValue] = useState('');
    const [oriScale, setOriScale] = useState(3);
    const [targetScale, setTargetScale] = useState(3);
    const [flag, setFlag] = useState([true, true])
    console.log(CHANGVALUELIST);
    return (
        <div className='home-page'>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="直接转谱" key="1">
                    <div className='tab-container'>
                        <div className='trans-left'>
                            <Input.TextArea placeholder='转换器的谱子在此输入.....' allowClear rows={20} value={orivalue} onChange={(e) =>
                                setOriValue(e.target.value)} />
                        </div>
                        <div className='trans-center'>
                            <Select defaultValue='C' style={{ width: '80px' }} onChange={(e: any) => setOriScale(e)} >
                                {CHANGVALUELIST.map((value => {
                                    return <Select.Option key={value.key} value={value.value}>{value.key}</Select.Option>
                                }))}
                            </Select>
                            <Button className='tran-btn' type="primary" onClick={() => {
                                setTargetValue(Transcore.tune(orivalue,
                                    {
                                        offset: targetScale - oriScale,
                                        preferSharpE: flag[0],
                                        preferSharpB: flag[1]
                                    }))
                            }} > 点击转换 </Button>
                            <Radio.Group defaultValue={true} className='radio-group' onChange={(e) => {
                                setFlag([e.target.value, flag[1]])
                            }} >
                                <Radio className='radio' value={true}>#3</Radio>
                                <Radio className='radio' value={false}>4</Radio>
                            </Radio.Group>
                            <Radio.Group defaultValue={true} className='radio-group' onChange={(e) => {
                                setFlag([flag[0], e.target.value])
                            }} >
                                <Radio className='radio' value={true}>#7</Radio>
                                <Radio className='radio' value={false}>[1]</Radio>
                            </Radio.Group>
                            <Select defaultValue='C' style={{ width: '80px' }} onChange={(e: any) => setTargetScale(e)}>
                                {CHANGVALUELIST.map((value => {
                                    return <Select.Option key={value.key} value={value.value}>{value.key}</Select.Option>
                                }))}
                            </Select>
                        </div>
                        <div className='trans-right' >
                            <Input.TextArea placeholder='这里是转换结果.....' readOnly allowClear rows={20} value={targetvalue} />
                        </div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="逐步转谱" key="2">
                    <div className='tab-container'>
                        <div className='trans-left'>
                            <Input.TextArea placeholder='转换器的谱子在此输入.....' allowClear rows={20} value={orivalue} onChange={(e) =>
                                setOriValue(e.target.value)} />
                        </div>

                        <div className='trans-center'>
                            <Select defaultValue='C' style={{ width: '80px' }} onChange={(e: any) => setOriScale(e)} >
                                {CHANGVALUELIST.map((value => {
                                    return <Select.Option key={value.key} value={value.value}>{value.key}</Select.Option>
                                }))}
                            </Select>
                            <Button className='tran-btn' type="primary" onClick={() => {
                                setTargetValue(Transcore.tune(orivalue,
                                    {
                                        offset: 1,
                                        preferSharpE: flag[0],
                                        preferSharpB: flag[1]
                                    }))
                            }} > <LeftOutlined />升一调 </Button>
                            <Button className='tran-btn' type="primary" onClick={() => {
                                setTargetValue(Transcore.tune(orivalue,
                                    {
                                        offset: -1,
                                        preferSharpE: flag[0],
                                        preferSharpB: flag[1]
                                    }))
                            }} > <RightOutlined />降一调</Button>
                            <Radio.Group defaultValue={true} className='radio-group' onChange={(e) => {
                                setFlag([e.target.value, flag[1]])
                            }} >
                                <Radio className='radio' value={true}>#3</Radio>
                                <Radio className='radio' value={false}>4</Radio>
                            </Radio.Group>
                            <Radio.Group defaultValue={true} className='radio-group' onChange={(e) => {
                                setFlag([flag[0], e.target.value])
                            }} >
                                <Radio className='radio' value={true}>#7</Radio>
                                <Radio className='radio' value={false}>[1]</Radio>
                            </Radio.Group>
                            <Select defaultValue='C' style={{ width: '80px' }} onChange={(e: any) => setTargetScale(e)}>
                                {CHANGVALUELIST.map((value => {
                                    return <Select.Option key={value.key} value={value.value}>{value.key}</Select.Option>
                                }))}
                            </Select>
                        </div>
                        <div className='trans-right' >
                            <Input.TextArea placeholder='这里是转换结果.....' readOnly allowClear rows={20} value={targetvalue} />
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Home