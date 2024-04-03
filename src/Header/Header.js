function Header({ openForm, setOpenForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img
          src="./logo.png"
          alt="Today I Learned Logo"
          height="68"
          width="68"
        />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setOpenForm((show) => !show)}
      >
        {openForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default Header;
