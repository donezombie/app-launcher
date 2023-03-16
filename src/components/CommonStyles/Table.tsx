import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { OrderType } from 'interfaces/common';
import CommonStyles from '.';
import CommonIcons from 'components/CommonIcons';

interface EnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderType;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
  showCheckBox?: boolean;
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props?.showCheckBox && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}

        {props.headCells.map((headCell: any) => {
          if (!!headCell?.disableSort) {
            return (
              <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                {headCell.label}
              </TableCell>
            );
          }

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

interface HeadCell<T> {
  disablePadding?: boolean;
  id: keyof any;
  label?: string;
  numeric?: boolean;
  disableSort?: boolean;
  Cell?: (row: T) => React.ReactElement;
}

interface TableCommonProps<T> {
  order: OrderType;
  orderBy: any;
  selected: readonly string[];
  page: number;
  rowsPerPage: number;
  rows: T[];
  headCells: HeadCell<T>[];
  totalCount: number;
  a?: (arg: T) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TableCommon<T>({
  order,
  orderBy,
  selected,
  page,
  rowsPerPage,
  rows,
  headCells,
  totalCount,
  handleChangePage,
  handleSelectAllClick,
  handleRequestSort,
  handleChangeRowsPerPage,
}: TableCommonProps<T>) {
  const theme = useTheme();
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={totalCount}
              headCells={headCells}
            />
            <TableBody>
              {rows.map((row, index) => {
                const rowAny = row as any;
                const isItemSelected = isSelected(rowAny?.name || '');
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={labelId}
                    selected={isItemSelected}
                  >
                    {headCells.map((hc, idx) => {
                      return (
                        <TableCell key={`cell-${index}-idx`}>
                          {hc?.Cell?.(rowAny) || rowAny?.[hc?.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {totalCount === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}>
                    <CommonStyles.Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <CommonIcons.InboxIcon fontSize='large' htmlColor={theme.colors?.gray} />
                      <CommonStyles.Typography variant='body1' sx={{ color: theme.colors?.gray }}>
                        No data found...
                      </CommonStyles.Typography>
                    </CommonStyles.Box>
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default TableCommon;
