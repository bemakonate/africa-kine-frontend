import React from 'react'
import Layout from '../../components/layout';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'

const Ordering = (props) => {
    const router = useRouter();

    if (props.isGatewayValid) {
        router.push('/ordering/menu');
    }
    return (
        <Layout>
            <div>
                Welcome to _____ . Would you like to start ordering
            </div>
        </Layout>

    )
}

const mapStateToProps = state => {
    return {
        isGatewayValid: state.order.isGatewayValid,
    }
}

export default connect(mapStateToProps)(Ordering)
