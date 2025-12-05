'use client'

import Link from "next/link"
import { useRef } from "react"
import { Nontification } from "@/_Component/Nontif"

export default function Signup() {
    const EmailRef = useRef<HTMLInputElement>(null)
    const NameRef =  useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="flex flex-col w-full h-screen justify-start py-5 items-center gap-10 ">
        <Nontification Message={"info"} Status={true}/>
        <h2 className="text-2xl font-bold">Aplikasi Perpustakaan</h2>
        <form action="" className="flex flex-col gap-5 w-lg bg-blue-200 p-10 py-16 rounded-4xl justify-between">
          <h2 className="text-2xl font-bold self-center">Sign-Up</h2>
          <label className="text-lg" htmlFor="email">Email</label>
          <input className="text-lg bg-gray-100 p-3 rounded-4xl focus:outline-0 focus:ring-0 border-0" type="email" name="email" id="email" placeholder="Masukan Email" required ref={EmailRef}/>

          <label className="text-lg" htmlFor="name">Nama</label>
          <input className="text-lg bg-gray-100 p-3 rounded-4xl focus:outline-0 focus:ring-0 border-0" type="text" name="name" id="name" placeholder="Masukan Nama" required ref={NameRef} />

          <label className="text-lg" htmlFor="password">Password</label>
          <input className="text-lg bg-gray-100 p-3 rounded-4xl focus:outline-0 focus:ring-0 border-0" type="password" name="password" id="password" min={8} required placeholder="Masukan Password" ref={passwordRef}/>

          <Link href={'./login'} className="self-start font-bold">
            Login
          </Link>
          <button className="bg-blue-600 p-5 rounded-full text-white font-bold text-lg">Sign-up</button>
        </form>
      </div>
    </>
  )
}