import React, { useContext } from 'react'
import Tips from './components/Tips'
import { NicknameContext } from './util/context'

export default () => {
    const { nickname } = useContext(NicknameContext)
    return (
        <div style={{
            margin: '30px auto 20px',
            textAlign: 'center',
            fontSize: '60px',
        }}>
            <p style={{ textShadow: ' 3px 2px 1px #a6b8bd' }}>Hi, {nickname}</p>
            <Tips />
        </div >
    )
}