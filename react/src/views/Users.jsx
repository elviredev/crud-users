import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({});
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers()
  }, []);

  /**
   * Supprimer un user
   * @param user
   */
  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want delete this user ?")) {
      return
    }

    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification("User was successfully deleted")
        getUsers()
      })
  }

  const getUsers = (url = '/users') => {
    setLoading(true)

    // Requête GET: récupérer liste users
    axiosClient.get(url)
      .then(({ data }) => {
        setLoading(false)
        // console.log(data)
        setUsers(data.data)
        setPagination(data.meta)
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Défilement doux vers le haut
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Users</h1>
          <Link to="/users/new" className="btn-add">Add new</Link>
        </div>

        <div className="card animated fadeInDown">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link to={'/users/'+u.id} className="btn-edit">Edit</Link>
                      &nbsp;
                      <button onClick={e => onDeleteClick(u)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
          {!loading &&
          <div className="pagination">
            <Pagination links={pagination.links} onPageClick={getUsers} />
          </div>
          }
        </div>
    </div>
  )
}
