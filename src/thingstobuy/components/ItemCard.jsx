import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { startDeletingItem } from "../../store/thingstobuy";

export const ItemCard = () => {
  const { items } = useSelector((state) => state.thingsToBuySlice);

  console.log(items)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnClick = () => {
    // dispatch(startNewItem(id

    navigate("/groups/add-new-item");
  };

  const handleOnDelete = (event) => {
    const { id } = event.target.dataset;
    console.log(id)

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas segur@?",
        text: "Una vez elimando, se ira para siempre!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(startDeletingItem(id));
          swalWithBootstrapButtons.fire("Borrado!", "El itema ha sido borrado correctamente.", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Cancelado!", "Tu item esta a salvo!", "error");
        }
      });
  };

  return (
    <>
      {items.map((item, i) => (
        <ul className="list-group">
          <li className="list-group-item mt-2" key={i} >
            <div className="container">
              <div className="row align-items-center">
                <input className="col-1 d-flex justify-content-start" type="checkbox" />
                <div className="col d-flex justify-content-start">{item.text}</div>
                <div className="col d-flex justify-content-center">
                  <Badge pill bg="secondary">
                    Usuario
                  </Badge>
                </div>
                <div className="col d-flex justify-content-end">
                  <button type="button" className="btn-close" aria-label="Close" data-id={item.id}onClick={handleOnDelete}></button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}

      <div className="position-absolute bottom-0 end-0 rounded-circle m-5">
        <button className="btn btn-primary btn-lg" onClick={handleOnClick}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
};
