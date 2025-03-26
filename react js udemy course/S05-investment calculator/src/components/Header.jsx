import LOGO from "../assets/investment-calculator-logo.png";


export default function Header() {
  return (
    <header id="header">
      <img src={LOGO} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
