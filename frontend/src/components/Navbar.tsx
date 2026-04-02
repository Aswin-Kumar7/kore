import React, { useState } from 'react';
import {
  FaShoppingCart,
  FaUtensils,
  FaUserCircle,
  FaSignOutAlt,
  FaListUl,
  FaIdBadge,
  FaCog,
  FaHome,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const isActive = (path: string) => location.pathname.startsWith(path);
  const isAdmin = user?.email === 'admin@kore.com';

  return (
    <nav className="sticky top-0 z-40 border-b border-white/30 bg-white/70 shadow-[0_12px_40px_rgba(124,45,18,0.14)] backdrop-blur-2xl">
      <div className="bg-gradient-to-r from-orange-500/92 via-orange-500/88 to-rose-500/92">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo/Brand */}
            <motion.div
              className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white shadow-sm backdrop-blur-sm"
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                <FaUtensils className="h-5 w-5 text-white transition-colors group-hover:text-orange-100" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-extrabold tracking-[0.18em] text-white transition-colors group-hover:text-orange-100 sm:text-xl">
                  KORE
                </h1>
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/80">Fresh ordering</p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden items-center gap-2 md:flex">
              {isAdmin ? (
                <>
                  <motion.button
                    onClick={() => navigate('/admin')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/admin') ? 'bg-white text-orange-600 shadow-md' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    <FaListUl className="h-4 w-4" />
                    Orders
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/admin/menumanagement')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/admin/menumanagement') ? 'bg-white text-orange-600 shadow-md' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    <FaCog className="h-4 w-4" />
                    Menu Management
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate('/menu')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/menu') ? 'bg-white text-orange-600 shadow-md' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    <FaHome className="h-4 w-4" />
                    Menu
                  </motion.button>

                  <motion.button
                    onClick={() => navigate('/orders')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive('/orders') ? 'bg-white text-orange-600 shadow-md' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    <FaListUl className="h-4 w-4" />
                    Orders
                  </motion.button>
                </>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart Button */}
              <motion.button
                onClick={onCartClick}
                className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/90 shadow-sm transition hover:bg-white/15 hover:text-white focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500 bg-white text-xs font-bold text-orange-700 shadow-lg"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setOpen((v) => !v)}
                  className="group flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-white/90 shadow-sm transition hover:bg-white/15 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <FaUserCircle className="h-6 w-6 transition-colors group-hover:text-orange-100" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <span className="hidden sm:inline capitalize font-medium">
                    {user?.name || user?.username || 'Account'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {open && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setOpen(false)}
                      />
                      
                      {/* Dropdown Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 z-20 mt-3 w-64 overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-2xl backdrop-blur-xl"
                      >
                        {/* User Info Header */}
                        <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-rose-50 px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {(user?.name || user?.username || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 capitalize">
                                {user?.name || user?.username}
                              </p>
                              <p className="text-sm text-gray-600">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {!isAdmin && (
                            <>
                              <motion.button
                                onClick={() => {
                                  setOpen(false);
                                  navigate('/profile');
                                }}
                                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 flex items-center gap-3 transition-colors duration-150"
                                whileHover={{ x: 4 }}
                              >
                                <FaIdBadge className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">Profile Settings</span>
                              </motion.button>

                              <motion.button
                                onClick={() => {
                                  setOpen(false);
                                  navigate('/orders');
                                }}
                                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 flex items-center gap-3 transition-colors duration-150"
                                whileHover={{ x: 4 }}
                              >
                                <FaListUl className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">Order History</span>
                              </motion.button>
                            </>
                          )}

                          {isAdmin && (
                            <motion.button
                              onClick={() => {
                                setOpen(false);
                                navigate('/admin');
                              }}
                              className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 flex items-center gap-3 transition-colors duration-150"
                              whileHover={{ x: 4 }}
                            >
                              <FaCog className="h-4 w-4 text-orange-500" />
                              <span className="font-medium">Admin Dashboard</span>
                            </motion.button>
                          )}

                          <div className="border-t border-gray-100 my-1" />

                            <motion.button
                            onClick={() => {
                              logout();
                              setOpen(false);
                              navigate('/login');
                            }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition-colors duration-150 hover:bg-red-50"
                            whileHover={{ x: 4 }}
                          >
                            <FaSignOutAlt className="h-4 w-4" />
                            <span className="font-medium">Sign Out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
