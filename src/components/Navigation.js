import { NavLink } from 'react-router-dom';

export default function Navigation({ userObj }) {
  return (
    <nav>
      <ul className='menu'>
        <li>
          <NavLink to='/'>
            <span className='material-icons-round'>home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile'>
            <span className='material-icons-round'>account_circle</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
