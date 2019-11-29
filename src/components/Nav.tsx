import React from 'react'

import styled from '@emotion/styled'
import { Link } from 'gatsby'
import GitpodLogoDark from '../resources/gitpod-logo-dark.svg'
import { colors } from '../styles/variables'
import DropDown from '../components/DropDown'
import Hamburger from '../resources/hamburger.svg'
import Multiply from '../resources/multiply.svg'

const StyledNav = styled.nav`
    background: ${colors.offWhite};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4rem 0;

    @media (max-width: 980px) {
        display: block;
        font-size: 120%;
    }

    img {
        height: 4rem;
    }

    ul {
        display: flex;
        align-items: center;

        @media(max-width: 980px) {
            position: absolute;
            top: 16%;
            left: 0;
            flex-direction: column;
            width: 100vw;
            height: 88vh;
            text-align: center;
            justify-content: center;
            align-items: center;
            background: ${colors.offWhite};
            z-index: 1;
        }
    }

    li {
        &:not(:last-child) {
            margin-right: 5rem;
        }

        @media(max-width: 980px) {
            width: 100%;

            &:not(:last-child) {
                margin: 0;
                margin-bottom: 3rem;
            }
        }
    }

    .link {
        position: relative;
        color: ${colors.text};
        padding-bottom: .8rem;
        font-weight: 400;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 100%;
            border-bottom: 2px solid ${colors.white};
            transition: all .4s cubic-bezier(0,.5,0, 1);
        }

        &:hover,
        &:focus {
            color: ${colors.link};

            &::after {
                right: 0;
                border-color: ${colors.link};
            }
        }
    }

    .nav__btn {
        border: none;
        z-index: 10000;
        background: ${colors.offWhite};

        &:hover {
            background: ${colors.offWhite};
        }

        &-container {
            position: absolute;
            top: 4rem;
            right: 2rem;
        }

        img {
            height: 4rem;
        }

        @media(min-width: 980px) {
            display: none;
        }
    }

`

class Nav extends React.Component {

    state = {
        isNavRendered: false
    }

    handleResize = () => {
        if (window.innerWidth < 980) {
            this.setState({ isNavRendered: false })
        } else {
            this.setState({ isNavRendered: true })
        }
    }

    toggleNavigation = () => {
        this.setState({ isNavRendered: !this.state.isNavRendered })
    }

    event = () => {
        if (window.innerWidth <= 980) {
            this.toggleNavigation()
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        if (window.innerWidth >= 980) {
            this.toggleNavigation()
        }
    }


    render() {
        return (
            <div className="grey-container">
                <div className="row">
                    <StyledNav role="navigation" className="nav">
                            <Link to="/"><img alt="Gitpod Logo" src={GitpodLogoDark} /></Link>
                            <div className="nav__btn-container">
                                <button
                                    className="nav__btn"
                                    aria-label="Navigation Toggle"
                                    onClick={this.toggleNavigation}
                                >
                                    {this.state.isNavRendered ? <img src={Multiply} alt="close menu icon" /> : <img src={Hamburger} alt="hamburger menu icon" />}
                                </button>
                            </div>
                            {
                                this.state.isNavRendered && (
                                <ul>
                                    <li><Link to='/features' className="link">Features</Link></li>
                                    <li><Link to='/pricing' className="link">Pricing</Link></li>
                                    <li><Link to='/enterprise' className="link">Enterprise</Link></li>
                                    <li>
                                        <DropDown title="Solutions">
                                            <li><Link to='/education' className="link">Education</Link></li>
                                            <li><Link to='/recruiting' className="link">Recruiting</Link></li>
                                            <li><Link to='/vendor' className="link">Vendor</Link></li>
                                        </DropDown>
                                    </li>
                                    <li>
                                        <DropDown title="Resources">
                                            <li><Link to='/docs' className="link">Docs</Link></li>
                                            <li><Link to='/blog' className="link">Blog</Link></li>
                                            <li><a href="https://spectrum.chat/gitpod/" target="_blank" className="link">Community</a></li>
                                        </DropDown>
                                    </li>
                                    <li><Link to="/#get-started" className="btn btn--cta">Start for Free</Link></li>
                                </ul>
                                )
                            }
                    </StyledNav>
                </div>
            </div>
        )
    }
}


export default Nav