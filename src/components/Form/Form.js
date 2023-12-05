import React from "react";
import FormTitle from '../FormTitle/FormTitle';
import logo from '../../images/logo.svg';
import './Form.css';
import AuthCaption from "../AuthCaption/AuthCaption";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Link } from 'react-router-dom';

function Form ({formName, name, title, question, link, linkName, children, buttonText, onSubmit, isLoading, isDisabled, isValid, errorType}) {
  return (
      <form className='form' name={name} onSubmit={onSubmit}>
      <Link to="/" className="form__link"><img className="form__logo" src={logo} alt='Логотип со смайликом'/></Link>
      <FormTitle title={title} />
        {children}
        <InfoTooltip
          errorType={errorType}
        />
        <button className={`form__save-button form__save-button_place_${formName}`} type="submit" name="save-button" disabled={isDisabled}>{isLoading? 'Сохранение...' : buttonText}</button>
        <AuthCaption question={question} link={link} linkName={linkName}/>
      </form> 
  )
}

export default Form;