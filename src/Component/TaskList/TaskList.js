import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./task.css";
import style from "./list.module.scss";

const TaskList = ({
  tasks,
  handleDone,
  handleDeleteTask,
  handleToggleDelOn,
  handleToggleDelOff,
}) => {
  const columns = [
    { id: "name", label: "Task name", minWidth: 200, width: "60%" },
    { id: "bin", width: "15%" },
    { id: "priority", label: "Priority", minWidth: 20, width: "5%" },
    { id: "done", label: "Done", maxWidth: 20, width: "10%" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "priority") {
      if (a[orderBy] === "high" && b[orderBy] === "low") return 1;
      else if (a[orderBy] === "high" && b[orderBy] === "medium") return 1;
      else if (a[orderBy] === "low" && b[orderBy] === "medium") return -1;
      else if (a[orderBy] === "low" && b[orderBy] === "high") return -1;
      else if (a[orderBy] === "medium" && b[orderBy] === "high") return -1;
      else if (a[orderBy] === "medium" && b[orderBy] === "low") return 1;
      return 0;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (e) => {
    handleRequestSort(e, property);
  };

  return (
    <Paper className={style.wrapper}>
      <TableContainer>
        <Table>
          <TableHead className={style.header}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    width: column.width,
                  }}
                >
                  {column.id === "bin" ? null : (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={createSortHandler(column.id)}
                      className={style.title}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(tasks, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onMouseOver={() => handleToggleDelOn(row.id)}
                    onMouseLeave={() => handleToggleDelOff(row.id)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "done" ? (
                            <Checkbox
                              onClick={() => handleDone(row.id)}
                              checked={value}
                              className={style.done}
                            >
                              value
                            </Checkbox>
                          ) : column.id === "bin" ? (
                            row.bin ? (
                              <IconButton
                                onClick={() => handleDeleteTask(row.id)}
                              >
                                <DeleteIcon fontSize="small"></DeleteIcon>
                              </IconButton>
                            ) : null
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TaskList;
