type NavbarProps = {
  onLogoClick: () => void
  onGenerateClick: () => void
}

function Navbar({ onLogoClick, onGenerateClick }: NavbarProps) {
  return (
    <header className="navbar">
      <button className="brand" type="button" onClick={onLogoClick}>
        <span className="brand-mark" aria-hidden="true">
          HS
        </span>
        <span>HireScript</span>
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#preview">Preview</a>
        <button className="nav-ghost" type="button">
          View examples
        </button>
        <button className="nav-cta" type="button" onClick={onGenerateClick}>
          Get started free
        </button>
      </nav>

      <button
        className="mobile-generate"
        type="button"
        onClick={onGenerateClick}
        aria-label="Generate a job description"
      >
        Menu
      </button>
    </header>
  )
}

export default Navbar
