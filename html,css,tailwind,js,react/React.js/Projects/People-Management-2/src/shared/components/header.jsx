import Button from "./button";

const Header = ({ onClick, heading, buttonName }) => {
  return (
    <header className=" bg-slate-900">
      <div className="flex items-center justify-between max-w-6xl w-11/12 mx-auto py-6  ">
        <h1 className="text-3xl font-bold text-teal-500 ">{heading}</h1>
        {buttonName && <Button onClick={onClick}>{buttonName}</Button>}
      </div>
    </header>
  );
};
export default Header;
