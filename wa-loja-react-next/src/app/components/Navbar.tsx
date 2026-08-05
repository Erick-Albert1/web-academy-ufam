"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { email, logout } = useAuthContext();

  if (pathname === "/login" || pathname === "/cadastro") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          WA Loja
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Início
              </Link>
            </li>
            {email && (
              <>
                <li className="nav-item">
                  <Link href="/favoritos" className="nav-link">
                    Favoritos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/cart" className="nav-link">
                    Carrinho
                  </Link>
                </li>
              </>
            )}
            {email ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50">{email}</span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-link nav-link"
                    onClick={logout}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Entrar
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
