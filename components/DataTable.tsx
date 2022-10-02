const StyledCell = ({ children }: { children?: React.ReactNode }) => (
  <div className="px-4 py-2 ring-2 ring-slate-300 dark:ring-slate-500">{children}</div>
)

const TableDataCell = ({ value }) => {
  // if data is array or object, show the data in a table, recursively.
  const transformData = (v: unknown, index?: number) =>
    Array.isArray(v) ? (
      v.every((i) => typeof i === 'string') ? (
        <StyledCell> {v.join(', ')} </StyledCell>
      ) : (
        v.map((item, i) => transformData(item, i))
      )
    ) : typeof v === 'object' ? (
      <Table key={index} data={{ ...v }} />
    ) : (
      <StyledCell key={index}>{String(v)}</StyledCell>
    )

  return (
    <td className="flex w-full whitespace-pre bg-slate-200 dark:bg-slate-800 text-start [&>*]:grow">
      {transformData(value)}
    </td>
  )
}

const Table = (props: DataTableProps) => {
  return (
    <table className="w-full" aria-label="data table">
      <tbody>
        {Object.entries(props.data || {}).map(([key, value]) => (
          <tr key={key} className="w-full">
            <th
              scope="row"
              className="px-4 py-2 ring-2 bg-slate-300 dark:bg-slate-700 text-start ring-slate-200 dark:ring-slate-500"
            >
              {key}
            </th>

            <TableDataCell value={value as unknown} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface DataTableProps {
  data?: Record<string, any>
}

export default function DataTable(props: DataTableProps) {
  return (
    <div className="w-full overflow-hidden overflow-x-auto rounded-lg">
      <Table data={props.data} />
    </div>
  )
}
