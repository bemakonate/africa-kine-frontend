import React from 'react';
import Link from 'next/link';

const data = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Menu',
        link: '/menu'
    },
    {
        label: 'Order',
        link: '/ordering'
    },
    {
        label: 'Contact',
        link: '/contact',
    }
]
const navLinks = (props) => {
    return (
        <div className={props.navLinksClass}>
            {data.map((item, index) => {
                return <Link key={`navLink-${index}`} href={item.link}>
                    <a className={props.navLinkClass} onClick={props.click}>{item.label}</a>
                </Link>
            })}
        </div>
    )
}

export default navLinks
