// src/Navigation.js
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/helloworld">User Data</Link>
    </nav>
  );
}

export default Navigation;
