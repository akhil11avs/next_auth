'use client'
import React, { useCallback, useMemo } from 'react';
import {
  Checkbox,
  Tooltip,
  useTheme,
  Iconify
} from '@mui/material';
import TableMUI from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { get, isFunction, isEmpty } from 'lodash';

import palette from '@/theme/palette';
import { dateFormatter } from '@/lib/utils';
import useResponsive from '@/customHook/useResponsive';

import Button from '../Button';
import TableMenu from './TableMenu';
import SimpleLoader from '../Loader';
import Pagination from '../Pagination';
import useSelection from './tableHook/useSelection';

import './table.scss';

const Table = ({
  columns,
  data,
  headerStyle,
  itemStyle,
  containerStyle,
  rowsPerPage,
  loading,
  headerComponent: TableHeader,
  pagination,
  totalCount,
  page,
  handlePageChange,
  onRowClick,
  moreActions,
  getSelectedIds,
  defaultSelectedIDs,
  handleSort,
  sort,
  actionButtons,
  wrapperStyle
}) => {
  const theme = useTheme();
  const tableColor = get(theme, 'palette.table', {});
  const lgUg = useResponsive('up', 'lg');

  const [selectedIDs, handleOnSelected, handleOnAllSelected] = useSelection({
    tableData: data,
    getSelectedIds,
    defaultSelectedIDs,
  });

  const checkedSelectionIntermediate = useMemo(
    () => data?.filter((ele) => selectedIDs[ele?._id]).length,
    [selectedIDs, data],
  );

  const allChecked = useMemo(
    () => (Object.keys(selectedIDs).length
      ? data?.every((ele) => selectedIDs[ele?._id])
      : false),
    [selectedIDs, data],
  );

  const handleRowClick = useCallback((row) => () => {
    if (isFunction(onRowClick)) {
      onRowClick(row);
    }
  }, [onRowClick]);

  const handleSorting = useCallback((dataKey, order) => () => {
    if (isFunction(handleSort)) {
      handleSort(dataKey, order);
    }
  }, [handleSort]);

  return (
    <div
      className="table_paper"
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: palette.background.paper,
        ...wrapperStyle,
        border: 'none',
      }}
    >
      <div className='table_header'>
        {TableHeader}
      </div>
      <TableContainer className="table_container" style={{ ...containerStyle, height: lgUg ? "85vh" : "72vh" }}>
        <TableMUI stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  backgroundColor: palette.background.accentBlue,
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  size="small"
                  key={column?.id}
                  style={{ width: column?.width }}
                  data-testId={`${column?.dataKey}-column`}
                  className={column.fixed ? 'pinnedColumn' : 'header'}
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: palette.text.primary,
                    // borderBlock: 'none',
                    fontSize: '0.7rem',
                    maxWidth: column.maxWidth || '4rem',
                    padding: '8px 8px 8px 16px',
                    ...headerStyle,
                  }}
                >
                  <div className="header_cell">
                    {column?.label}
                    {column?.type === 'selection' && (
                      <Checkbox
                        key={column?._id}
                        indeterminate={
                          checkedSelectionIntermediate > 0 &&
                          checkedSelectionIntermediate < data?.length
                        }
                        checked={allChecked}
                        onChange={handleOnAllSelected}
                      />
                    )}
                    {column.sort ? (
                      <div className="sortLabel" data-testId="sorting">
                        <Iconify
                          onClick={handleSorting(column?.dataKey, 1)}
                          icon="mingcute:arrow-down-line"
                          cursor="pointer"
                          ml={-0.5}
                          sx={{
                            width: 14,
                            padding: 0,
                            color:
                              !isEmpty(sort) && sort[column?.dataKey] === 1
                                ? 'green'
                                : 'inherit',
                          }}
                        />
                        <Iconify
                          onClick={handleSorting(column?.dataKey, -1)}
                          icon="mingcute:arrow-up-line"
                          cursor="pointer"
                          ml={-0.5}
                          sx={{
                            width: 14,
                            color:
                              !isEmpty(sort) && sort[column?.dataKey] === -1
                                ? 'green'
                                : 'inherit',
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </TableCell>
              ))}
              {!isEmpty(
                typeof actionButtons === 'function'
                  ? actionButtons({})
                  : actionButtons
              ) ? (
                <TableCell
                  className="pinnedColumn"
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: tableColor?.itemColor,
                    // borderBlock: 'none',
                    ...headerStyle,
                  }}
                />
              ) : null}
              {!isEmpty(
                typeof moreActions === 'function'
                  ? moreActions({})
                  : moreActions
              ) ? (
                <TableCell
                  className="pinnedColumn"
                  sx={{
                    backgroundColor: tableColor?.headerBackground,
                    color: tableColor?.itemColor,
                    // borderBlock: 'none',
                    ...headerStyle,
                  }}
                />
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableCell
                align="center"
                colSpan={columns?.length}
                className="table_loader"
              >
                <SimpleLoader type="circular" loading={loading} />
              </TableCell>
            ) : !loading && isEmpty(data) ? (
              <TableCell
                align="center"
                colSpan={columns?.length}
                className="table_loader"
              >
                No Data Found!
              </TableCell>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  onClick={handleRowClick(row)}
                  sx={{
                    cursor: 'pointer',
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f7f9fb',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,.07) !important',
                    },
                  }}
                  data-testid="tableBody_test"
                >
                  {columns.map((column) => {
                    if (column?.render) {
                      const Component = column?.render;
                      return (
                        <TableCell
                          key={column?.dataKey}
                          style={{
                            // borderBlock: 'none',
                            cursor: 'pointer',
                            ...itemStyle,
                          }}
                        >
                          <Component data={row} {...column} index={rowIndex} />
                        </TableCell>
                      );
                    }
                    switch (column?.type) {
                      case 'index':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              fontSize: '14px',
                              fontFamily: 'var(--font-Poppins-Regular)',
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          >
                            {rowIndex + 1}
                          </TableCell>
                        );
                      case 'selection':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          >
                            <Checkbox
                              checked={selectedIDs[row?._id] || false}
                              onChange={(event) => handleOnSelected(event, row)}
                            />
                          </TableCell>
                        );
                      case 'text':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            sx={{
                              // borderBlock: 'none',
                              ...itemStyle,

                              maxWidth: column.maxWidth || '6rem',
                              ...column?.cellStyle,
                            }}
                            onClick={(e) =>
                              column?.onClick ? column.onClick(row, e) : {}
                            }
                          >
                            <Tooltip
                              placement='bottom-start'
                              title={get(row, column?.dataKey, '')}>
                              <div style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '14px',
                                fontFamily: 'var(--font-Poppins-Regular)'
                              }}>{get(row, column?.dataKey, '')} </div>
                            </Tooltip>
                          </TableCell>
                        );
                      case 'date':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column?.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                              ...column?.cellStyle,
                            }}
                            onClick={(e) =>
                              column?.onClick ? column.onClick(row, e) : {}
                            }
                          >
                            <Tooltip
                              title={dateFormatter(
                                get(row, column?.dataKey, ""),
                                column?.format
                              )}
                            >
                              {get(row, column?.dataKey)
                                ? dateFormatter(
                                  get(row, column?.dataKey, ""),
                                  column?.format
                                )
                                : "N/A"}
                            </Tooltip>
                          </TableCell>
                        );
                      case 'button':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              color: tableColor?.cellItemColor,
                              ...itemStyle,
                            }}
                          >
                            <Button
                              label={column?.buttonLabel}
                              className="buttonStyle"
                              style={{
                                backgroundColor:
                                  theme?.palette?.actionButtonBackground,
                              }}
                            />
                          </TableCell>
                        );

                      case 'boolean':
                        return (
                          <TableCell
                            key={column?.dataKey}
                            className={
                              column.fixed ? 'pinnedRows' : 'table_cell'
                            }
                            style={{
                              // borderBlock: 'none',
                              color: tableColor?.cellItemColor,
                              ...itemStyle,
                              maxWidth: column.maxWidth || '3rem',
                            }}
                          >
                            {row?.isActive
                              ? column?.activeData
                              : column?.inActiveData}
                          </TableCell>
                        );
                      default:
                        return (
                          <TableCell
                            style={{
                              // borderBlock: 'none',
                              ...itemStyle,
                            }}
                          />
                        );
                    }
                  })}
                  <TableMenu
                    moreActions={
                      typeof moreActions === 'function'
                        ? moreActions(row)
                        : moreActions
                    }
                    actionButtons={
                      typeof actionButtons === 'function'
                        ? actionButtons(row)
                        : actionButtons
                    }
                    row={row}
                    itemStyle={itemStyle}
                  />
                </TableRow>
              ))
            )}
          </TableBody>
        </TableMUI>
      </TableContainer>
      {pagination && (
        <Pagination
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
Table.defaultProps = {
  columns: [],
  data: [],
  headerStyle: {},
  containerStyle: {},
  itemStyle: {},
  rowsPerPage: 0,
  loading: false,
  headerComponent: () => { },
  pagination: false,
  totalCount: 0,
  page: 1,
  handlePageChange: () => { },
  moreActions: [],
  onRowClick: () => { },
  getSelectedIds: () => { },
  defaultSelectedIDs: [],
};

export default Table;
