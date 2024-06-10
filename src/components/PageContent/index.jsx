import React from "react";

const PageContent = ({ children, style, ...restProps }) => (
  <div
    {...restProps}
    data-testid="page_content"
    style={{
      backgroundColor: '#fff',
      padding: '14px 6px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

PageContent.defaultProps = {
  loading: false,
  children: <span />,
};

export default PageContent;
