import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field 
                    key={name}
                    label={label}
                    type="text" 
                    name={name}
                    component={SurveyField} 
                />
            );
        });
    }

    render() {
        return (
            // {this.props.handleSubmit(values => console.log(values))}
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> 
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button className="teal btn-flat right white-text" type="submit">
                         Next 
                        <i className="material-icons right"> done </i>
                    </button>
                </form>
            </div>
        );
    }
}

//values of each form field and validate , call automatically by redux form
function validate(values) {
    const errors = {};

    // if (!values.title) {
    //     errors.title = "You must provide a title";
    // }

    // if (!values.subject) {
    //     errors.subject = "You must provide a subject";
    // }

    // if (!values.body) {
    //     errors.body = "You must provide a body";
    // }
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    return errors
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false //by default it is true , and will loss form value
})(SurveyForm);


/* <Field  //handleSubmit provide by reduxform helper 
    type="text"
    name="surveyTitle"  // form value assign to name key in redux form
    component="input"  //HTML input tag
/> */