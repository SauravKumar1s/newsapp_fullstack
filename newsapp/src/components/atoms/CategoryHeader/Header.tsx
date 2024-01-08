import React from 'react';
import './Header.styles.css';
import { useDarkMode } from '../../organisms/context/DarkModeContext';
type CategoryHeaderProps = {
  title: string;
  onClick?: any;
  style?: React.CSSProperties;
};

const CategoryHeader = ({title, onClick, style}: CategoryHeaderProps) => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'dark-mode text-white py-3 mt-4 bg-blue-400 mb-3' : 'light-mode  text-white bg-blue-500 py-3 mt-4 mb-3'}>
    <div className=''>
      <a onClick={onClick}>
        <h3 style={style} className='flex justify-center items-center'>
          {title}
          <span className=''>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </span>
        </h3>
      </a>
    </div>
    </div>
  );
};

export default CategoryHeader;
