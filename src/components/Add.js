import React from 'react';
import PropTypes from 'prop-types';

class Add extends React.Component {
    state = {
        author: '',
        text: '',
        isAgree: false,
    }
    onBtnClickHandler = (e) => {
        e.preventDefault()
        const {author, text} = this.state
        this.props.onAddNews({ id: +new Date(), author, text })
    }
    handleChange = (e) => {
        const { id, value } = e.currentTarget
        this.setState({ [id]: value })
    }
    handleCheckboxChange = (e) => { 
        this.setState({ isAgree: e.currentTarget.checked })
    }
    validate = () => {
        const {author, text, isAgree} = this.state
        if (author.trim() && text.trim() && isAgree) {
            return true
        }
        return false
    }
    render() {
        const { author, text, isAgree } = this.state
        return (
            <form className='add'>
                <input
                    id='author'
                    type='text'
                    onChange={this.handleChange}
                    className='add__author'
                    placeholder='Ваше имя'
                    value={author}/>
                <textarea
                    id='text'
                    onChange={this.handleChange}
                    className='add__text'
                    placeholder='Текст новости'
                    value={text}>
                </textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' onChange={this.handleCheckboxChange}/> Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    disabled={!this.validate()}>
                    Добавить новость
                </button>
            </form>
        )
    }
}
Add.propTypes = {
    onAddNews: PropTypes.func.isRequired,
}

export { Add } // именованный экспорт