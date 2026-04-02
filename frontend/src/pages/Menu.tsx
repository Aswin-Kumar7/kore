import React from 'react';
import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import CartDrawer from '../components/Cart';
import { motion } from 'framer-motion';

const MenuPage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  return (
    <div className="page-shell">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <motion.main 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>
        
        <MenuList />
      </motion.main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default MenuPage;
