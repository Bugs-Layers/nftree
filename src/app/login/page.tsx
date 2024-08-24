import React from 'react'
import { useUserStore } from '~/lib/stores/user'

const page = () => {
    const { user, setUser } = useUserStore()

    return (
        <div>Login</div>
    )
}

export default page