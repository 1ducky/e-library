'use client'


import Link from "next/link"
import { SideBar } from "./Sidebar"
import { useState } from "react"
import { useUser,useClerk } from "@clerk/nextjs"
import Image from "next/image"

// Deklarasi Type
interface MenuState {
    SideBar : boolean
    UserMenu : boolean
}

type MenuKey = keyof MenuState

export const MenuUi = () => {
    // State
    const [State,setState] = useState<MenuState>({
        'SideBar' : false,
        'UserMenu' : false
        }
    )

    // StateHandler
    function StateHandler (Param : MenuKey) {
        setState(prev => ({
            ...prev,
            [Param] : !State[Param]
            
        }))
    }

    const {isSignedIn,user} = useUser()
    const {signOut} = useClerk()
    return(
        <>
            <div className="fixed top-0 left-0 flex justify-between w-screen h-20 p-5 bg-blue-950 z-40 text-white">
                <div className="flex flex-row gap-10 flex-nowrap items-center">
                    <button onClick={() => StateHandler('SideBar')} className="w-10 h-10 bg-blue-700 rounded-full">=</button>
                    <h1 className="text-2xl">E-Library</h1>
                </div>
                <div className="flex justify-end items-center flex-1 lg:gap-3 gap-8">
                    <input type="text" className="bg-blue-700 p-1 px-2 rounded-full focus:outline-0 focus:ring-0 border-0 mx-10 w-[30%]"/>
                    {isSignedIn ? (
                        <>
                            <button onClick={() => StateHandler('UserMenu')} className="w-10 h-10 bg-blue-700 rounded-full relative overflow-hidden">
                                <Image 
                                    src={user.imageUrl} 
                                    alt="Profile"
                                    fill
                                />

                            </button>
                            <ul className={`absolute right-5 top-24 bg-blue-700 flex flex-col overflow-hidden rounded-2xl ${State.UserMenu ? 'block' : 'hidden'}`}>

                                <p  className="text-lg p-3 border-b-red-200 bg-transparent transition-colors">Hai {user.username}</p>
                                <Link href={'/'} className="text-lg p-3 hover:bg-blue-500 bg-transparent transition-colors">Pemberitahuan</Link>
                                <Link href={'/'} className="text-lg p-3 hover:bg-blue-500 bg-transparent transition-colors">Pengaturan</Link>
                                <button onClick={() => signOut()} className="text-lg text-start p-3 hover:bg-blue-500 bg-transparent transition-colors">Log-Out</button>
                            </ul>
                        </>
                    ): (
                        <div className="px-3 py-2 bg-blue-700 rounded-full">
                            <Link href={'/sign-in'}>
                                Masuk <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                        </div>
                    )}

                </div>
                

            </div>
            {/* SideBar */}
            <SideBar Condition={State.SideBar}/>
            
        </>
    )
}