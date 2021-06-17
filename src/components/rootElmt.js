import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as layoutActions from '../store/layout/actions';
import axios from '../constants/instances/backend';

const rootElmt = ({ children, setBusinessData }) => {

    useEffect(() => {
        const run = async () => {
            const res = await Promise.all([
                axios.get('/business-info'),
                axios.get('/restaurant-settings/business'),
            ]);

            const businessInfo = res[0].data;
            const businessHours = res[1].data.business.hours;
            setBusinessData({ ...businessInfo, hours: businessHours })

        }
        run();
    }, [])


    return children;
}




const mapDispatchToProps = dispatch => {
    return {
        setBusinessData: (data) => dispatch(layoutActions.setBusinessData(data)),
    }
}
export default connect(null, mapDispatchToProps)(rootElmt)
