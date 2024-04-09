import React from 'react';

import TableCell from './TableCell';

import type { ITableCell, ITableRow } from '../../common/types';

interface IProps {
  cells: ITableCell[];
}

const TableRow = ({ cells }: IProps) => {
  return (
    <tr>
      {cells.map((cell: ITableCell) => (
        <TableCell cell={cell} />
      ))}
    </tr>
  );
};

export default TableRow;
