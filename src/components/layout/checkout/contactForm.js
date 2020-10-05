import React, { useState, useEffect } from 'react'
import formDefaultConfig from '../../../constants/contactFormConfig';
import {
    createFormConfig,
    createFormValues,
    updateFormConfigValidity,
    updateFormConfig,
    updateFormValues,
    createInput,
    updateIsWholeFormValid,
    // removeFields
} from '../../../constants/helpers/form-helpers'

const ContactForm = (props) => {
    const [form, setForm] = useState(null); //form values, represents values
    const [formConfig, setFormConfig] = useState(null); //form elements, store actual values of the form
    const [isWholeFormValid, setIsWholeFormValid] = useState(true);
    const [errorMsgs, setErrorMsgs] = useState(null);

    useEffect(() => {
        const newForm = createFormValues(formDefaultConfig);
        const newFormConfig = createFormConfig(formDefaultConfig);

        setForm(newForm);
        setFormConfig(newFormConfig);
    }, []);

    useEffect(() => {
        if (formConfig) {
            const newFormConfig = updateFormConfigValidity(formConfig);
            setFormConfig(newFormConfig);
        }

        if (props.getFormData) {
            props.getFormData(form);
        }

    }, [form])


    //Check if the entire form can pass
    useEffect(() => {
        if (formConfig) {
            //Change the form error messages
            const invalidInputs = formConfig.filter(input => input.errorMsg && input.touched);
            const newErrorMsgs = invalidInputs.map(input => {
                return {
                    errorMsg: input.errorMsg,
                    label: input.label
                }
            });

            const isFormValid = updateIsWholeFormValid(formConfig);
            setIsWholeFormValid(isFormValid);
            setErrorMsgs(newErrorMsgs);
        }
    }, [formConfig])

    const handleChange = ({ inputId, event }) => {
        const newFormConfig = updateFormConfig({ formConfig: formConfig, inputId: inputId, event: event });
        const newForm = updateFormValues({ form: form, inputId: inputId, event: event });

        setForm(newForm);
        setFormConfig(newFormConfig);
    };



    const contactInput = ({ label, id, inputClass, ...props }) => {
        return (
            <div className={`form-group ${props.touched && (!props.valid) ? 'error' : ''}`}>
                <div className="form-control-label">{label} {(props.rules && props.rules.required) ? <span>*</span> : null}</div>
                <div className={`form-control-wrapper ${props.inputWrapperClass ? props.inputWrapperClass : ''}`}>
                    {createInput({
                        change: handleChange,
                        className: `form-control ${inputClass ? inputClass : ''}`,
                        inputId: id,
                        ...props
                    })}
                    {props.adjcentElmts}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (props.getIsFormValid) {
            props.getIsFormValid(isWholeFormValid)
        }
    }, [isWholeFormValid])


    return (
        <div>
            {formConfig && formConfig.map((rowConfig, index) => (
                <React.Fragment key={index}>{contactInput(rowConfig)}</React.Fragment>
            ))}
            <ul>
                {errorMsgs && errorMsgs.map((input, index) => {
                    return <li key={index}>"{input.label}" {input.errorMsg} </li>
                })}
            </ul>
            <style>{`
                .form-group{
                    display:grid;
                    grid-template-columns: 140px 1fr;
                }
            `}</style>
        </div>

    )





}

export default ContactForm
