import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';

import TableRow from './TableRow';

import type { ITableCell, ITableRow } from '../../../common/types';

interface IProps {
  headerCells: ITableCell[];
  rows: ITableRow[];
}

const Table = ({ headerCells, rows }: IProps) => {
  return (
    <div className='border rounded'>
      <table className='table table-striped table-border-radius'>
        <thead>
          <TableRow cells={headerCells} />
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
