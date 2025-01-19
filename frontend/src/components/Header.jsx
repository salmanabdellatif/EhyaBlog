import React, { useState } from 'react'
import { images } from '../constants'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { Link, useNavigate } from 'react-router-dom'

const NavItemsInfo = [
  { name: 'Home', type: 'link', href: '/' },
  { name: 'Articles', type: 'link', href: '/articles' },
  {
    name: 'Pages',
    type: 'dropdown',
    items: [
      { title: 'About us', href: '/about' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  { name: 'Pricing', type: 'link', href: '/pricing' },
  { name: 'Faq', type: 'link', href: '/faq' },
]

const NavItem = ({ item, navIsVisible }) => {
  const [dropdown, setdropdown] = useState(false)
  const toggleDropdownHandler = () => {
    setdropdown(curState => !curState)
  }
  return (
    <li className='relative group cursor-pointer'>
      {item.type === 'link' ? (
        <>
          <Link to={item.href} className='px-4 py-2'>
            {item.name}
          </Link>
          <span
            className={`${
              navIsVisible ? 'text-white' : 'text-blue-500'
            } cursor-pointer absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100`}>
            /
          </span>
        </>
      ) : (
        <div className='flex flex-col items-center'>
          <button className='px-4 py-2 flex gap-x-1 items-center' onClick={toggleDropdownHandler}>
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? 'block' : 'hidden'
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
            <ul className='flex flex-col shadow-lg rounded-lg overflow-hidden text-center bg-dark-soft lg:bg-transparent'>
              {item.items.map((innerItem, index) => (
                <Link
                  key={index}
                  to={innerItem.href}
                  className='hover:bg-dark-hard hover:text-white text-white lg:text-dark-soft px-4 py-2'>
                  {innerItem.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [navIsVisible, setNavIsVisible] = useState(false)
  const userState = useSelector(state => state.user)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const navVisiblityHandler = () => {
    setNavIsVisible(curState => {
      return !curState
    })
  }
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
      <header className='container mx-auto px-5 py-4 flex justify-between items-center'>
        <Link to='/'>
          <img className='w-16' src={images.logo} alt='logo' />
        </Link>
        <div className='lg:hidden z-50 cursor-pointer'>
          {navIsVisible ? (
            <AiOutlineClose className='w-6 h-6' onClick={navVisiblityHandler} />
          ) : (
            <AiOutlineMenu className='w-6 h-6' onClick={navVisiblityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? 'right-0' : '-right-full'
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] fixed top-0 bottom-0 w-full lg:w-auto lg:static flex lg:justify-end flex-col lg:flex-row gap-x-9 justify-center items-center`}>
          <ul className='flex gap-2 flex-col items-center gap-y-5 lg:flex-row font-semibold text-white lg:text-dark-hard'>
            {NavItemsInfo.map(item => (
              <NavItem key={item.name} item={item} navIsVisible={navIsVisible} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className='flex gap-2 flex-col items-center gap-y-5 lg:flex-row font-semibold text-white lg:text-dark-hard'>
              <div className='relative group'>
                <div className='flex flex-col items-center'>
                  <button
                    className='flex gap-x-1 items-center whitespace-nowrap mt-10 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'
                    onClick={() => setProfileDropdown(prev => !prev)}>
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? 'block' : 'hidden'
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
                    <ul className='flex flex-col shadow-lg rounded-lg overflow-hidden text-center bg-dark-soft lg:bg-transparent'>
                      <button
                        onClick={() => navigate('/profile')}
                        type='button'
                        className='hover:bg-dark-hard hover:text-white text-white lg:text-dark-soft px-4 py-2'>
                        Profile Page
                      </button>
                      <button
                        onClick={logoutHandler}
                        type='button'
                        className='hover:bg-dark-hard hover:text-white text-white lg:text-dark-soft px-4 py-2'>
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='whitespace-nowrap mt-10 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'>
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  )
}

export default Header
