import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination, useSortBy } from "react-table";
import { fetchPlayers, searchPlayers } from "../../redux/actions/playerActions";
import { formatPlayerPositions } from "../../utils/formatHelpers";
import Loading from "../Loading";
import Error from "../Error";
import Pagination from "../Pagination";
import SearchBox from "../SearchBox";
import "../../styles/player/PlayerList.css";
import PlayerNotFound from "./PlayerNotFound";


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
  if (players.length === 0) return <PlayerNotFound onReset={() =>{
    setSearchName("");
    setSearchNationality("");
  }} />


  const handleReset = () => {
    setSearchName("");
    setSearchNationality("");
    dispatch(fetchPlayers(1, 10));
  }

  return (
    <div className="players-list-container">
      <h2>All Players</h2>
      <SearchBox inputs={[{
            value: searchName,
            onChange: (e) => setSearchName(e.target.value),
            placeholder: "Search by name",
          },
          {
            value: searchNationality,
            onChange: (e) => setSearchNationality(e.target.value),
            placeholder: "Search by nationality",
          },
        ]}
        onSearch={() =>
          dispatch(searchPlayers(searchName, searchNationality, 1, 10))
        }
        onReset={handleReset} />

      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
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
