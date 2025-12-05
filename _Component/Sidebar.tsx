
import Link from "next/link"

interface SideBarProp {
    Condition : boolean
}

export const SideBar = ({Condition} : SideBarProp) => {

    const CurrentDate = new Date()
    const CurrentYear = CurrentDate.getFullYear()
    return(
        <div className={`text-white fixed bg-indigo-900 w-9/12 xl:w-auto px-10 py-5 pb-5 h-screen flex flex-col justify-between z-39 transition-all duration-300 ${ Condition ? 'left-0' : '-left-full'}`}>
                <div className="">
                    <ul className="font-medium flex flex-col gap-1">
                        <li><Link href={'/'}>Beranda</Link></li>
                        <li><Link href={'/list'}>Kategori</Link></li>
                        <li>Populer</li>
                        <li>Trending</li>

                    </ul>
                    <div className="flex flex-col flex-nowrap">
                    
                    </div>
                </div>
                

                <footer className="text-center  mb-20">
                    <h2 >E-Library</h2>
                    <small className="">Powered by <a href="https://mangadex.org">Mangadex {CurrentYear}©</a></small>
                </footer>
            </div>
            
    )
}