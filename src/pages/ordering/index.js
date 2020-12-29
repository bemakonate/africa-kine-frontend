import React from 'react'
import Layout from '../../components/layout';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import * as  layoutActions from '../../store/layout/actions';

const Ordering = (props) => {
    const router = useRouter();

    if (props.isGatewayValid) {
        router.push('/ordering/menu');
    }
    return (
        <Layout>
            <div>
                <p>Welcome to _____ . Would you like to start ordering</p>
                <button onClick={() => props.openPickUpModal()}>Start Ordering</button>
            </div>
        </Layout>

    )
}

const mapStateToProps = state => {
    return {
        isGatewayValid: state.order.isGatewayValid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openPickUpModal: (data) => dispatch(layoutActions.openPickUpModal(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ordering)
