import { TableBody, TableCell, TableRow } from "./table";

const TableSkeletonRowLoader = ({
  length = 6,
  noOfRows = 5,
}: {
  length?: number;
  noOfRows?: number;
}) => {
  return (
    <TableBody className="page-fade-in">
      {Array.from({ length: noOfRows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="animate-pulse">
          {Array.from({ length }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className="w-full rounded bg-gray-300 p-3.5"></div>
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
}: {
  length?: number;
  message?: string;
}) => {
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
