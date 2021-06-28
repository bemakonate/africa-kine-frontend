import React from 'react'
import Image from 'next/image';


const myLoader = ({ src }) => src;
const image = (props) => {
    return <Image {...props} loader={myLoader} />
}

export default image
