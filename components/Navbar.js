import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/blog"><a>Blog</a></Link></li>
      </ul>
    </nav>
  )
}

export default Navbar