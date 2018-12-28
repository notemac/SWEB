import React from 'react'; // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types'; // у Article это react и prop-types

class Article extends React.Component {
    state = {
        isReadOnly: true,
        id: this.props.article.id,
        author: this.props.article.author,
        text: this.props.article.text
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({ text: e.currentTarget.value })
    }
    onBtnEditClickHandler = (e) => {
        e.preventDefault()
        this.setState({isReadOnly: false})
    }
    onBtnSaveClickHandler = (e) => {
        e.preventDefault()
        this.setState({isReadOnly: true})
        const {id, author, text} = this.state
        this.props.onUpdateNews({id, author, text})
    }
    onBtnDelClickHandler = (e) => {
        e.preventDefault()
        const {id, author, text} = this.state
        this.props.onDeleteNews({id, author, text})
    }
    render() {
        const {isReadOnly, author, text} = this.state
        return (
            <article>
                <div className='news__author'>{author}: </div>
                <textarea
                    onChange={this.handleChange}
                    value={text}
                    readOnly={isReadOnly}
                    cols={82}
                    rows={5}> 
                </textarea>
                <br></br>
                <button
                    className='edit__btn'
                    onClick={this.onBtnEditClickHandler}
                    disabled={!isReadOnly}>
                    Редактировать
                </button>
                {
                    !isReadOnly && <button
                        className='save__btn'
                        onClick={this.onBtnSaveClickHandler}>
                        Сохранить
                    </button>
                }
                <button
                    className='del__btn'
                    onClick={this.onBtnDelClickHandler}>
                    Удалить
                </button>
            </article>
        )
    }
}
Article.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }),
    onUpdateNews: PropTypes.func.isRequired,
    onDeleteNews: PropTypes.func.isRequired
}

export { Article } // именованный экспорт