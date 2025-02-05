import React,{Component} from 'react';
import {Field, reduxForm} from "redux-form";

import {connect} from "react-redux";
import {createStream} from "../../actions";
import {logicalExpression} from "@babel/types";


class StreamForm extends Component {

    renderError = ({error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({input, label, meta}) => {
        console.log(input);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}

            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        //console.log(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>

                <button className="ui button primary">Submit</button>
            </form>
        );
    };
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        //on ran if the user did not enter a title
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        //on ran if the user did not enter a title
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
