import { TableBody, TableCell, TableRow } from "./table";

const TableSkeletonRowLoader = ({
  length = 6,
  noOfRows = 5,
  noBody = false,
}: {
  length?: number;
  noOfRows?: number;
  noBody?: boolean;
}) => {
  if (noBody) {
    return (
      <>
        {Array.from({ length: noOfRows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="animate-pulse">
            {Array.from({ length }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <div className="w-full rounded bg-gray-200 p-4"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }
  return (
    <TableBody className="page-fade-in">
      {Array.from({ length: noOfRows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="animate-pulse">
          {Array.from({ length }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className="w-full rounded bg-gray-200 p-4"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export const EmptyTable = ({
  length = 6,
  message = "No record found",
  noBody = false,
}: {
  length?: number;
  message?: string;
  noBody?: boolean;
}) => {
  if (noBody) {
    return (
      <TableRow className="animate-pulse">
        <TableCell colSpan={length}>
          <div className="py-10 text-center">{message}</div>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableBody className="page-fade-in">
      <TableRow className="animate-pulse">
        <TableCell colSpan={length}>
          <div className="py-10 text-center">{message}</div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableSkeletonRowLoader;
