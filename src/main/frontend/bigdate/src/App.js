import React, { useEffect, useState } from 'react';
import './App.css';
import  Navbar2 from './components/navigation/Navbar2'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';


import PostMain from './pages/post/PostMain';
import PostView from './pages/post/PostView';
import HotspotView from './pages/HotspotView';
import RegisterPost from './pages/RegisterPost';
import Mypage from './pages/mypage/Mypage';
import MyPostList from './pages/mypage/MyPostList';
import MyScrapList from './pages/mypage/MyScrapList';
import PlaceView from './pages/PlaceView';

import Signup from './pages/Signup';
import Home_ad from './pages/admin/Home_ad';
import Navbar_ad from './components/navigation/Navbar_ad';
import UserList from './pages/admin/UserList';
import PostMain_ad from './pages/admin/post/PostMain_ad';
import PostView_ad from './pages/admin/post/PostView_ad';





const App = () => {


  const [isAdminPage, setIsAdminPage] = useState(window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/users')|| window.location.pathname.startsWith('/posts')|| window.location.pathname.startsWith('/postViewAd'));

  useEffect(() => {
    const handleLocationChange = () => setIsAdminPage(window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/users')|| window.location.pathname.startsWith('/posts')|| window.location.pathname.startsWith('/postViewAd'));
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <BrowserRouter>
      {isAdminPage ? <Navbar_ad /> : <Navbar2 />}
      <>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/mypage" component={Mypage} />
        <Route path="/courses" component={MyPostList} />
        <Route path="/scraps" component={MyScrapList} />
        <Route path="/post" component={PostMain}/>
        <Route path="/postView/:course_id" component={PostView}/>
        <Route path="/hotspots/:hotspot_id" component={HotspotView}/>
        <Route path="/user/course/write" component={RegisterPost}/>
        <Route path="/place/:id" component={PlaceView}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/admin" component={Home_ad}/>
        <Route path="/users" component={UserList}/>
        <Route path="/posts" component={PostMain_ad}/>
        <Route path="/postViewAd/:course_id" component={PostView_ad}/>

      </>
    </BrowserRouter>
  );
};

export default App;
