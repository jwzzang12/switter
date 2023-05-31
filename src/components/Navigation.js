import { Link } from 'react-router-dom';

export default function Navigation({ userObj }) {
  return (
    <nav>
      <ul className='menu'>
        <li>
          <Link to='/'>
            <span class='material-icons-round'>home</span>
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <span class='material-icons-round'>account_circle</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
