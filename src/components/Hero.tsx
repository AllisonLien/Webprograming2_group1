type Props = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: Props) {
  return (
    <header className="hero">
      <div className="container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}