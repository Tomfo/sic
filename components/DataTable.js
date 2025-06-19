const DataTable = ({ columns, renderRow, data }) => {
  console.log('table data', data);
  return (
    <table className='w-full mt-4'>
      <thead>
        <tr className='text-left text-sm text-gray-500'>
          {columns.map((c) => (
            <td key={c.accessor} className={c.className}>
              {c.header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default DataTable;
