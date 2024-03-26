import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination, useSortBy } from "react-table";
import { fetchPlayers, searchPlayers } from "../../redux/actions/playerActions";
import { formatPlayerPositions } from "../../utils/formatHelpers";
import Loading from "../Loading";
import Error from "../Error";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import Pagination from "../Pagination";
import { IoIosArrowDropupCircle } from "react-icons/io";

import "../../styles/player/PlayerList.css";


const PlayersList = () => {
  const dispatch = useDispatch();
  const { loading, players, error } = useSelector((state) => state.player);
  const [searchName, setSearchName] = useState("");
  const [searchNationality, setSearchNationality] = useState("");

  useEffect(() => {
    dispatch(fetchPlayers(1, 10));
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Nationality",
        accessor: "nationality",
      },
      {
        Header: "Jersey Number",
        accessor: "jerseyNumber",
      },
      {
        Header: "Team",
        accessor: "teamName",
        Cell: ({ value }) => (value ? value : "No team assigned"),
      },
      {
        Header: "Position",
        accessor: "positions",
        Cell: ({ value, row }) =>
          row.original.defaultPosition
            ? row.original.defaultPosition
            : formatPlayerPositions(value),
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
      columns,
      data: players,
      initialState: { pageIndex: 0 },
    }, useSortBy, usePagination)

  if (loading) return <Loading />
  if (error) return <Error />

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(searchPlayers(searchName, searchNationality, 1, 10));
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSearchNationality("");
    dispatch(fetchPlayers(1, 10));
  }

  return (
    <div className="players-list-container">
      <h2>All Players</h2>
      <div className="player-search-box">
        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} onKeyDown={handleSearchKeyPress} placeholder="Search by name" />
        <input value={searchNationality} onChange={(e) => setSearchNationality(e.target.value)} onKeyDown={handleSearchKeyPress} placeholder="Search by nationality" />
        <button className="submit-btn" onClick={() => dispatch(searchPlayers(searchName, searchNationality, 1, 10))} >
          <CiSearch />
        </button>
        <button className="reset-btn" onClick={handleReset}>
          <GrPowerReset />
        </button>
      </div>
      <table {...getTableProps()} className="table">
      <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </div>
  );
};

export default PlayersList;
