import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as layoutActions from '../store/layout/actions';
import axios from '../constants/instances/backend';

const rootElmt = ({ children, setBusinessData }) => {

    useEffect(() => {
        const run = async () => {
            try {
                const res = await Promise.all([
                    axios.get('/business-info'),
                    axios.get('/restaurant-settings/business'),
                ]);

                const businessInfo = res[0].data;
                const businessHours = (res[1].data && res[1].data.business && res[1].data.business.hours) ? res[1].data.business.hours : null;
                setBusinessData({ ...businessInfo, hours: businessHours })

            } catch (err) {
                setBusinessData(null)
            }

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
