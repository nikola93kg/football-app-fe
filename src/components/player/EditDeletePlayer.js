import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editPlayer, fetchPlayers, deletePlayer, searchPlayers } from "../../redux/actions/playerActions";
import { fetchTeams } from "../../redux/actions/teamActions";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import { CiSearch } from "react-icons/ci";
import { sortObjectsAlphabetically } from "../../utils/formatHelpers";
import { usePagination, useTable } from "react-table";
import Pagination from "../Pagination";
import "../../styles/player/EditDeletePlayer.css";


const PlayerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  nationality: Yup.string().required("Nationality is required"),
  jerseyNumber: Yup.number()
    .required("Jersey Number is required")
    .positive()
    .integer(),
  teamName: Yup.string().required("Team Name is required"),
});

function EditDeletePlayer() {
  const dispatch = useDispatch();
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playerIdToDelete, setPlayerIdToDelete] = useState(null);
  const players = useSelector((state) => state.player.players);
  const teams = useSelector((state) => state.team.teams);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
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
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <div className="buttons">
            <button className="edit-btn" onClick={() => setEditingPlayer(players.find((player) => player.id === value))} >
              <BiSolidEditAlt />
            </button>
            <button className="delete-btn" onClick={() => handleOpenDeleteModal(value)} >
              <MdDelete />
            </button>
          </div>
        ),
      },
    ],
    [players]
  );

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
      initialState: { pageIndex: 0 }},
    usePagination
  );

  const handleSearch = () => {
    dispatch(searchPlayers(searchName));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleOpenDeleteModal = (playerId) => {
    setIsDeleteModalOpen(true);
    setPlayerIdToDelete(playerId);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPlayerIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (playerIdToDelete) {
      dispatch(deletePlayer(playerIdToDelete))
        .then(() => {
          toast.success("Player deleted successfully!");
          handleCloseDeleteModal();
        })
        .catch(() => {
          toast.error("Something went wrong with deleting the player");
          handleCloseDeleteModal();
        });
    }
  };

  if (!players.length) return <div>Loading players...</div>

  return (
    <div className="edit-delete-player-container">
      <div className="search-box">
        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search player name" />
        <button className="submit-btn" onClick={handleSearch}>
          <CiSearch />
        </button>
      </div>
      <h2>Players</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
      {isDeleteModalOpen && (
        <Modal onClose={handleCloseDeleteModal}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this player?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
        </Modal>
      )}
      {editingPlayer && (
        <Modal onClose={() => setEditingPlayer(null)}>
          <Formik
            initialValues={{
              name: editingPlayer.name,
              age: editingPlayer.age,
              nationality: editingPlayer.nationality,
              jerseyNumber: editingPlayer.jerseyNumber,
              teamName: editingPlayer.teamName || "",
              teamId: editingPlayer.teamId || "",
            }}
            validationSchema={PlayerSchema}
            onSubmit={(values) => {
              const updatedValues = {
                ...values,
                teamId: values.teamId,
              };
              dispatch(editPlayer(editingPlayer.id, updatedValues))
                .then(() => {
                  setEditingPlayer(null);
                  toast.success("Player successfully updated");
                })
                .catch((error) => {
                  toast.error("Something went wrong");
                });
            }}>
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <label htmlFor="name">Name</label>
                <Field name="name" />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                {errors.age && touched.age ? <div>{errors.age}</div> : null}
                <label htmlFor="nationality">Nationality</label>
                <Field name="nationality" />
                {errors.nationality && touched.nationality ? (
                  <div>{errors.nationality}</div>
                ) : null}
                <label htmlFor="jerseyNumber">Jersey Number</label>
                <Field name="jerseyNumber" type="number" />
                {errors.jerseyNumber && touched.jerseyNumber ? (
                  <div>{errors.jerseyNumber}</div>
                ) : null}

                <div className="option-select">
                  <label htmlFor="teamId">Team</label>
                  <Field as="select" name="teamId" onChange={(e) => setFieldValue("teamId", e.target.value)} >
                    <option value="">{values.teamName}</option>
                    {sortObjectsAlphabetically(teams, "name").map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </Field>
                  {errors.teamId && touched.teamId ? (
                    <div>{errors.teamId}</div>
                  ) : null}
                </div>
                <button type="submit">Save Changes</button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
}

export default EditDeletePlayer;