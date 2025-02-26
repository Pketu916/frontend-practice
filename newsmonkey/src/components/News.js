import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            // totalResults: 0,
            loading: false,
        };
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=41caa50b0cbb4a9089c6e78bcfbba5c1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, 
            totalResults: parsedData.totalResults ,
            loading : false
        });
    }
    hendlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=41caa50b0cbb4a9089c6e78bcfbba5c1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState(
            {
                articles: parsedData.articles,
                page: this.state.page - 1,
                loading: false
            }
        )
    }
    hendleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=41caa50b0cbb4a9089c6e78bcfbba5c1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState(
                {
                    articles: parsedData.articles,
                    page: this.state.page + 1,
                    loading: false
                }
            )
        }
    }

    render() {
        return (
            <div className='container my-3' >
                <h2 className='text-center'>top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className='row mt-5' >

                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}  >
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
                <div className='container d-flex justify-content-between' >
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.hendlePrevClick}>Previous</button>
                    <button disabled={((this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))} type="button" className="btn btn-dark" onClick={this.hendleNextClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default News
