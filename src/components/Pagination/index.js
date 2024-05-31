'use client';
import React, { useMemo, useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material';
import PaginationMUI from '@mui/material/Pagination';

import './pagination.scss';
import Typography from '../Typography';

const Pagination = ({
  totalCount, page, rowsPerPage, handlePageChange,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const tableColor = get(theme, 'palette.table', {});

  const count = useMemo(
    () => Math.ceil((totalCount) / rowsPerPage),
    [totalCount, rowsPerPage],
  );

  window.addEventListener('resize', () => {
    // viewport and full window dimensions will change
    setWindowWidth(window.innerWidth);
  });

  return (
    <div className="pagination_container" data-testid="pagination_test">
      <PaginationMUI
        color="primary"
        className="pagination_button"
        count={count}
        siblingCount={windowWidth < 500 ? -2 : 1}
        boundaryCount={windowWidth < 500 ? 0 : 1}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
        sx={{
          color: theme.palette?.table?.paginationItemColor,
          '& .css-110ksil-MuiButtonBase-root-MuiPaginationItem-root': {
            color: tableColor?.pagination?.inactiveItemColor,
          },
          '& .Mui-disabled': {
            backgroundColor: `${tableColor?.pagination?.paginationNextPreviousDisabledButtonColor} !important`,
          },
          '& .Mui-selected': {
            backgroundColor: `${tableColor?.pagination?.paginationNextPreviousDisabledButtonColor} !important`,
          },
          '& .MuiPaginationItem-previousNext': {
            backgroundColor: tableColor?.pagination?.previousNextBackground,
            color: tableColor?.pagination?.paginationNextPreviousButtonColor,
          },
        }}
      />
      {windowWidth < 500 && (
        <Typography
          className="current_page"
          sx={{
            backgroundColor: tableColor?.pagination?.previousNextBackground,
          }}
        >
          {page}
        </Typography>
      )}
    </div>
  );
};

Pagination.defaultProps = {
  totalCount: 0,
  rowsPerPage: 1,
  page: 0,
  handlePageChange: () => { },
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};

export default Pagination;
