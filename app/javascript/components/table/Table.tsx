import React from 'react';

import TableRow from './TableRow';

import type { ITableCell, ITableData, ITableRow } from '../../common/types';

interface IProps {
  headerCells: ITableCell[];
  rows: ITableRow[];
}

const Table = ({ headerCells, rows }: IProps) => {
  return (
    <table className='table'>
      <thead>
        <TableRow cells={headerCells} />
      </thead>
      <tbody>
        {rows.map((row: ITableRow) => (
          <TableRow cells={row.cells} />
        ))}
      </tbody>
    </table>

    // <table className='table'>
    //   <thead>
    //     <tr>
    //       <th scope='col'>#</th>
    //       <th scope='col'>First</th>
    //       <th scope='col'>Last</th>
    //       <th scope='col'>Handle</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <th scope='row'>1</th>
    //       <td>Mark</td>
    //       <td>Otto</td>
    //       <td>@mdo</td>
    //     </tr>
    //     <tr>
    //       <th scope='row'>2</th>
    //       <td>Jacob</td>
    //       <td>Thornton</td>
    //       <td>@fat</td>
    //     </tr>
    //     <tr>
    //       <th scope='row'>3</th>
    //       <td>Larry the Bird</td>
    //       <td>@twitter</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
};

export default Table;
