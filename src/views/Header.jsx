import React from 'react'

export default function Header({ user }) {
    return (
        <header>
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        Git UI
                    </a>
                </div>
                {user && (
                    <div className="navbar-menu is-active">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary" href="/admin">
                                        <span className="icon is-small">
                                            <i className="fas fa-cogs"></i>
                                        </span>
                                        <span>Admin</span>
                                    </a>
                                    <a className="button is-light" href="/logout">
                                        <span className="icon is-small">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </span>
                                        <span>Log out</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
