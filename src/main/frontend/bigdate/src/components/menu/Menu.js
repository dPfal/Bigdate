import ListGroup from 'react-bootstrap/ListGroup';
import Mypage from '../../pages/mypage/Mypage';
import MyPostList from '../../pages/mypage/MyPostList';
import MyScrapList from '../../pages/mypage/MyScrapList';

function Menu() {
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
      return (
        <ListGroup defaultActiveKey='/mypage'>
          <ListGroup.Item action href='/mypage'>
            마이페이지
          </ListGroup.Item>
          <ListGroup.Item action href='user/:user_id/courses'>
            내 코스 목록
          </ListGroup.Item>
          <ListGroup.Item action href='user/:user_id/scraps'>
           내 찜 목록
          </ListGroup.Item>
        </ListGroup>
      );
    }
export default Menu;