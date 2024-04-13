import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';

import TableCell from './TableCell';

import type { ITableCell, IPaginationParams } from '../../../common/types';

interface IProps {
  cells: ITableCell[];
  paginationParams?: IPaginationParams;
  onSort?: (key: string) => void;
}

const TableRow = ({ cells, paginationParams, onSort }: IProps) => {
  return (
    <tr>
      {cells.map((cell: ITableCell) => (
        <Fragment key={nanoid()}>
          <TableCell
            cell={cell}
            paginationParams={paginationParams}
            onSort={onSort}
          />
        </Fragment>
      ))}
    </tr>
  );
};

export default TableRow;
