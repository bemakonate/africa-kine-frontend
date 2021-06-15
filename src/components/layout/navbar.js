import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/menu"><a>Menu</a></Link></li>
                <li><Link href="/contact"><a>Contact</a></Link></li>
                <li><Link href="/ordering"><a>Ordering</a></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
