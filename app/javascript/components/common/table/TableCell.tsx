import React from 'react';

import type { ITableCell } from '../../../common/types';

interface IProps {
  cell: ITableCell;
  classes?: string;
}

const TableCell = ({ cell }: IProps) => {
  return <td className={cell.classes}>{cell.label}</td>;
};

export default TableCell;
