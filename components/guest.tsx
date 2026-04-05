import { SignInButton } from "@clerk/nextjs"

const Guest = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold">Welcome to the Expense Tracker</h1>
        <p className="">Please sign in to manage your expenses and track your financial goals.</p>
        <SignInButton />
    </div>
  )
}

export default Guest