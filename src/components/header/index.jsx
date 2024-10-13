import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className="header">
			<div className="logo">
				<p>Чай-Кана</p>
			</div>
			<div className="nav">
				<Link to="/">Главная</Link>
				<Link to="/about">О нас</Link>
				<Link to="/contact">Контакты</Link>

				<Link to="/catalog">Каталог</Link>

				<Link to="/admin">Админка</Link>

			</div>
			
		</div>
	);
};

export default Header;