import React from 'react'
import NavLinks from './navLinks';
import Link from '../../resuable/link';

const navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/" className="nav__title">Comapny Name</Link>
            <NavLinks navLinksClass="nav__links" navLinkClass="nav__link" />
        </nav>
    )
}

export default navbar
