import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';

import TableRow from './TableRow';

import type {
  IPaginationParams,
  ITableCell,
  ITableRow,
} from '../../../common/types';
import Spinner from '../spinner/Spinner';

interface IProps {
  headerCells: ITableCell[];
  rows: ITableRow[];
  isLoading: boolean;
  paginationParams?: IPaginationParams;
  onSort?: (key: string) => void;
}

const Table = ({
  headerCells,
  rows,
  isLoading,
  paginationParams,
  onSort,
}: IProps) => {
  return (
    <div className='border rounded'>
      <table className='table table__border'>
        <thead>
          <TableRow
            cells={headerCells}
            paginationParams={paginationParams}
            onSort={onSort}
          />
        </thead>
        {isLoading ? (
          <tbody>
            <tr className='table__spinner'>
              <td>
                <Spinner />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {rows.length > 0 ? (
              rows.map((row: ITableRow) => (
                <Fragment key={nanoid()}>
                  <TableRow cells={row.cells} />
                </Fragment>
              ))
            ) : (
              <tr className='table__empty'>
                <td className='text-dark'>No data to show</td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
