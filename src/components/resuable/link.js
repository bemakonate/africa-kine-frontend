import React from 'react'
import Link from 'next/link'
const NextLink = ({ children, href, as, ...props }) => {
    return (
        <Link href={href} as={as}><a {...props}>{children}</a></Link>
    )
}

export default NextLink
