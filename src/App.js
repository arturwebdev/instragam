import './App.css';
import {Routes,Route} from 'react-router-dom'
import HeaderWrapper from './components/pages/HeaderWrapper';
import Posts from './components/Posts/Posts';
import AddImg from './components/AddImg/AddImg';
import Messenges from './components/Messenges/Messenges';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/news' element={<HeaderWrapper/>}>
            <Route index element={<Posts/>} />
            <Route path='add-img' element={<AddImg />}/>
            <Route path='messenges' element={<Messenges />}/>
            <Route path='profile' element={<Profile />}/>
        </Route>
        <Route path="*" element={<h1>Error 404</h1>} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
