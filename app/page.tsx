import React from 'react'
import Guest from '@/components/guest'
import { currentUser } from '@clerk/nextjs/server'
import TransactionForm from '@/components/transactionForm'
import Balance from '@/components/balance'

const HomePage = async() => {

const user = await currentUser()

if (!user) {
  return <Guest />
}

  return (
    <div>
      <h1>Expense Tracker</h1>

      <h2>Welcome back, {user.firstName}!</h2>
      <Balance />
      <TransactionForm />

    </div>
  )
}

export default HomePage