import React, { Fragment } from 'react';
import { nanoid } from 'nanoid';

import TableCell from './TableCell';

import type { ITableCell } from '../../../common/types';

interface IProps {
  cells: ITableCell[];
}

const TableRow = ({ cells }: IProps) => {
  return (
    <tr>
      {cells.map((cell: ITableCell) => (
        <Fragment key={nanoid()}>
          <TableCell cell={cell} />
        </Fragment>
      ))}
    </tr>
  );
};

export default TableRow;
