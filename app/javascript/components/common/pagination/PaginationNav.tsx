import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { useFirstRender } from '../../../hooks/useFirstRender';

interface IProps {
  totalPages: number;
  activePage: number;
  onClick: (page: number) => void;
}

const PaginationNav = ({ totalPages, activePage, onClick }: IProps) => {
  const [pages, setPages] = useState<number[]>([1, 2, 3]);
  const isFirstRender = useFirstRender();

  useEffect(() => {
    let pagesCopy = pages;
    if (!isFirstRender && activePage !== pagesCopy[1]) {
      if (activePage !== 1 && activePage !== totalPages) {
        pagesCopy[0] = activePage - 1;
        pagesCopy[1] = activePage;
        pagesCopy[2] = activePage + 1;
      }
    }
    setPages(pagesCopy);
  }, [activePage]);

  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <a
            className='page-link'
            onClick={() => {
              onClick(activePage - 1);
            }}
          >
            Previous
          </a>
        </li>
        {pages.map((page: number) => (
          <li
            key={nanoid()}
            className={`page-item ${activePage === page ? 'active' : ''}`}
          >
            <a
              className='page-link'
              onClick={() => {
                onClick(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}
        >
          <a
            className='page-link'
            onClick={() => {
              onClick(activePage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationNav;
