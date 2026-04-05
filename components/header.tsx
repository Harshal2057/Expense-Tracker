import React from 'react'
import {SignInButton , Show , UserButton} from "@clerk/nextjs"
import {onBoardUser} from "../modules/auth/actions/index"

const Header = async() => {

        const user = await onBoardUser()

  return (
    <nav className='navbar'>
            <div className='navbar-container'>
                    <h2>Expense Tracker</h2>
                    <Show when={"signed-out"}>
                            <SignInButton />
                    </Show>

                    <Show when={"signed-in"}>
                            <UserButton />
                    </Show>
            </div>
    </nav>
  )
}

export default Header