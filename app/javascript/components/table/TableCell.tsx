import React from 'react';

import type { ITableCell } from '../../common/types';

interface IProps {
  cell: ITableCell;
}

const TableCell = ({ cell }: IProps) => {
  return <td>{cell.value}</td>;
};

export default TableCell;
