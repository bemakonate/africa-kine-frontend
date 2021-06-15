import React from 'react';
import Link from 'next/link';

const data = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Contact',
        link: '/contact',
    },
    {
        label: 'Menu',
        link: '/menu'
    },
    {
        label: 'Order',
        link: '/ordering'
    }
]
const navLinks = (props) => {
    return (
        <div className={props.navLinksClass}>
            {data.map((item, index) => {
                return <Link href={item.link}><a className={props.navLinkClass} onClick={props.click}>{item.label}</a></Link>
            })}
        </div>
    )
}

export default navLinks
