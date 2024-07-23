import Link from "next/link";

export default function Navbar(){
    return(
        <div className="flex h-[60px] px-[10px] justify-between items-center bg-blue-500">
            <p>Logo</p>
            <div className="flex gap-4">
              <Link href={'/register'}>Register</Link>  
              <Link href={'/'}>Login</Link>  
            </div>
        </div>
    )
}