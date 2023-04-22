import React, { useState } from "react";
import { text } from "stream/consumers";
import modalStyles from "./page.module.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleModal} className="css_modal">
        Add Location
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2>Add Location</h2>
              <form>
                <div className="add">
                  <label htmlFor="address">Address:</label>
                  <input
                    placeholder="Type full address"
                    className={modalStyles.inputBx}
                    type="text"
                  />

                  <label htmlFor="state">State:</label>
                  <input
                    placeholder="State Name"
                    className={modalStyles.inputBx}
                    type="text"
                  />

                  <label htmlFor="District">District:</label>
                  <input
                    placeholder="District Name"
                    className={modalStyles.inputBx}
                    type="text"
                  />
                </div>

                <label htmlFor="description">Description:</label>
                <input
                  placeholder="Type full description"
                  className={modalStyles.inputBx}
                  type="text"
                />
                <button onClick={toggleModal}>Close</button>
                <button>Add</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
