import React from 'react';

import { ORDER_BY } from '../../../common/constants';

import type { IPaginationParams, ITableCell } from '../../../common/types';

interface IProps {
  cell: ITableCell;
  classes?: string;
  paginationParams?: IPaginationParams;
  onSort?: (key: string) => void;
}

const TableCell = ({ cell, paginationParams, onSort }: IProps) => {
  const { key, label, classes, isSortable } = cell;
  const iconDirection =
    paginationParams?.sortBy === key &&
    paginationParams?.orderBy === ORDER_BY.ASC
      ? 'up'
      : 'down';
  return (
    <td className={classes}>
      {label}
      {isSortable && onSort && (
        <button
          type='button'
          className='btn btn-sm btn-link'
          onClick={() => {
            onSort(key);
          }}
        >
          <i className={`bi bi-caret-${iconDirection}-fill`} />
        </button>
      )}
    </td>
  );
};

export default TableCell;
