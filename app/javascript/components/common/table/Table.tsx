import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';

import TableRow from './TableRow';

import type {
  IPaginationParams,
  ITableCell,
  ITableRow,
} from '../../../common/types';

interface IProps {
  headerCells: ITableCell[];
  rows: ITableRow[];
  paginationParams?: IPaginationParams;
  onSort?: (key: string) => void;
}

const Table = ({ headerCells, rows, paginationParams, onSort }: IProps) => {
  return (
    <div className='border rounded'>
      <table className='table table-striped table-border-radius'>
        <thead>
          <TableRow
            cells={headerCells}
            paginationParams={paginationParams}
            onSort={onSort}
          />
        </thead>
        <tbody>
          {rows.map((row: ITableRow) => (
            <Fragment key={nanoid()}>
              <TableRow cells={row.cells} />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
