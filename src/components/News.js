import React from 'react';
import PropTypes from 'prop-types';
import { Article } from './Article';

class News extends React.Component {
    renderNews = () => {
        const {data} = this.props
        let newsTemplate = null
        if (data.length > 0) {
            newsTemplate = data.map(function(item) {
                return (<Article key={item.id} article={item} onUpdateNews={this.props.onUpdateNews} onDeleteNews={this.props.onDeleteNews}/>)
            }, this)
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }
        return newsTemplate
    }
    render() {
        const {data} = this.props
        return (
            <div className='news'>
                {data.length ? <strong className='news__count'>Всего новостей: {data.length}</strong>: null}
                {this.renderNews()}
            </div>
        )
    }
}
News.propTypes = {
    data: PropTypes.array.isRequired,
    onUpdateNews: PropTypes.func.isRequired,
    onDeleteNews: PropTypes.func.isRequired
}

export { News } // именованный экспорт