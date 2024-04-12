import React, { Fragment } from 'react';

import TableCell from './TableCell';

import type { ITableCell } from '../../../common/types';

interface IProps {
  cells: ITableCell[];
}

const TableRow = ({ cells }: IProps) => {
  return (
    <tr>
      {cells.map((cell: ITableCell, i: number) => (
        <Fragment key={i}>
          <TableCell cell={cell} />
        </Fragment>
      ))}
    </tr>
  );
};

export default TableRow;
