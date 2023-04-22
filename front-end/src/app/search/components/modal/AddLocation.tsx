"use client"
import React, { useState, useEffect } from "react";
import modalStyles from "../../page.module.css";

export default function AddLocation() {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const disable = useDisable(address, state, country, description)

  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  const handleAddLocation = async(e: React.MouseEvent) => {
    e.preventDefault()
    try{

    }catch(error){
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="css_modal">
        Add Location
      </button>

      {show && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2>Add Location</h2>
              <form>
                <div className="add">
                  <label htmlFor="address">Address:</label>
                  <input
                    id='address'
                    placeholder="Address"
                    className={modalStyles.inputBx}
                    type="text"
                    value={ address }
                    onChange={ (e) => setAddress(e.target.value) }
                  />

                  <label htmlFor="state">State:</label>
                  <input
                    id="state"
                    placeholder="District/State Name"
                    className={modalStyles.inputBx}
                    type="text"
                    value={ state }
                    onChange={ (e) => setState(e.target.value) }
                  />

                  <label htmlFor="country">Country:</label>
                  <input
                    id="country"
                    placeholder="Country Name"
                    className={modalStyles.inputBx}
                    type="text"
                    value={ country }
                    onChange={ (e) => setCountry(e.target.value) }
                  />
                </div>

                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  value={ description }
                  onChange={ (e) => setDescription(e.target.value) }
                  placeholder="Type full description"
                  className={modalStyles.inputBx}
                  type="text"
                />
                <button onClick={ toggleModal }>Close</button>
                <button onClick={ handleAddLocation } disabled={ disable }>Add</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function useDisable(address: string, state: string, country: string, description: string) {
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    /* if all inputs empty */
    if(address.length === 0 || state.length === 0 || country.length === 0 || description.length === 0) {
      setDisable(true)
    }else{
      setDisable(false)
    }
  }, [address, state, country, description])

  return disable
}