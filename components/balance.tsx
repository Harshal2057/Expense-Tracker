import { getBalance } from '@/modules/transaction/actions'
import React from 'react'

const Balance = async() => {

    const {balance} = await getBalance()

  return (
    <div>
        <h1>Your Balance</h1>
        <p className='font-bold text-3xl'>${balance}</p>
    </div>
  )
}

export default Balance