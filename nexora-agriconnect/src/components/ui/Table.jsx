import React from 'react';

export const Table = ({
  columns = [], // [{ key, header, align: 'left' | 'right', render: (row) => ... }]
  data = [],
  keyField = 'id',
  className = '',
  emptyMessage = 'No records found'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key || col.header}
                className={col.align === 'right' ? 'align-right' : ''}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row[keyField] || idx}>
              {columns.map((col) => (
                <td
                  key={col.key || col.header}
                  className={col.align === 'right' ? 'align-right' : ''}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
