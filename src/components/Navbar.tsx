type Props = {
  siteName: string;
};

export default function Navbar({ siteName }: Props) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <span className="navbar-brand">{siteName}</span>

        <div className="navbar-links">
          <a href="#" className="active">Home</a>
          <a href="#">Categories</a>
          <a href="#">About</a>
        </div>
      </div>
    </nav>
  );
}