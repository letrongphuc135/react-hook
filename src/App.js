import React, { useState, useEffect } from 'react';
import PostList from './components/PostList/PostList'
import Pagination from './components/Pagination';
import queryString from 'query-string'
import PostFilterForm from './components/PostFilterForm';
function App() {

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 1,
    _totalRows: 11
  })
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  })

  function handlePageChange(newPage) {
    console.log('newPage', newPage);
    setFilter({
      ...filter,
      _page: newPage
    })
  }

  //filter search
  function handleFilter(newFilter) {
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.search
    })
  }


  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filter); //_limit=10&_page=1
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchPostList();
  }, [filter])



  return (
    <div className="App">
      <h2>React hooks</h2>
      <PostFilterForm onSubmit={handleFilter} />
      <PostList posts={postList} />
      <Pagination onPageChange={handlePageChange} pagination={pagination} />
    </div>
  );
}

export default App;
