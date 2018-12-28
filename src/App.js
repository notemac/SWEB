import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Add } from './components/Add';
import { News } from './components/News';
import newsData from './data/newsData';
import './App.css';


class App extends React.Component {
    state = {
        news: newsData,
    }
    handleAddNews = (article) => {
        this.setState({ news: [article, ...this.state.news] })
    }
    handleDeleteNews = (article) => {
        function deleteNews(article) {
            return function(item) {
                if (item.id == article.id)
                    return false
                else
                    return true
            }
        }
        this.setState({ news: this.state.news.filter(deleteNews(article)) })
    }
    handleUpdateNews = (article) => {
        function updateNews(article) {
            return function(item) {
                if (item.id == article.id)
                    return {id: article.id, author: item.author, text: item.text}
                else
                    return item
            }
        }
        this.setState({ news: this.state.news.map(updateNews(article)) })
    }
    render() {
        return (
            <React.Fragment>
                <Add onAddNews={this.handleAddNews} />
                <h3>Новости</h3>
                <News data={this.state.news} onUpdateNews={this.handleUpdateNews} onDeleteNews={this.handleDeleteNews}/>
            </React.Fragment>
        )
    }
}

export default App;
