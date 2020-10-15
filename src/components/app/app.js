import React, { Component } from 'react';
import idGenerator from 'react-id-generator';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {label: 'Going to learn React', important: true, like: false, id: idGenerator()},
        {label: 'That is funny', important: false, like: false, id: idGenerator()},
        {label: 'I need a break...', important: false, like: false, id: idGenerator()},
      ],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, important: !old.important};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newArr
      };
    });
  };

  onToggleLiked(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, like: !old.like};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newArr
      };
    });
  };

  onUpdateSearch(term) {
    this.setState({term});
  }

  onFilterSelect(filter) {
    this.setState({filter});
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false, 
      id: idGenerator()
    };
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      };
    });
  };

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
      return {
        data: newArr
      };
    });
  };

  searchPost(items, term) {
    return term.length === 0 ? 
      items : 
      items.filter(item => item.label.indexOf(term) > -1);
  };

  filterPost(items, filter) {
    return filter === 'like' ?
      items.filter(item => item.like) :
      items;
  };

  render() {
    const {data, term, filter} = this.state;

    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    
    return ( 
      <div className="app">
        <AppHeader
          liked={liked}
          allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}/>
        <PostAddForm
          onAdd={this.addItem}/>
      </div>
    );
  }
};

