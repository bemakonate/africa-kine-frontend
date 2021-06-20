import React from 'react'
import NavLinks from './navLinks';
import Link from '../../resuable/link';
import { connect } from 'react-redux';

const navbar = (props) => {
    return (
        <nav className="navbar">
            <Link href="/" className="nav__title">{props.businessData.companyName}</Link>
            <NavLinks navLinksClass="nav__links" navLinkClass="nav__link" />
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        businessData: state.layout.businessData,
    }
}
export default connect(mapStateToProps)(navbar);
