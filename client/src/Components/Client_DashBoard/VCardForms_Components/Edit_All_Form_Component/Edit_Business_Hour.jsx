import React, { useState, useEffect, useContext } from "react";
import "./Edit_form_styles/Edit_Business_Hour.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { AppContext } from "../../../Context/AppContext";

const Edit_Business_Hour = () => {
  let { URL_Alies } = useParams();
  let { Token,FormSubmitLoader, setFormSubmitLoader } =
    useContext(AppContext);
  let [BussinessCount, setBussinessCount] = useState(0);
  let [UpdateToggle, setUpdateToggle] = useState(false);
  let [Monday, setMonday] = useState({ from: "", to: "" });
  let [Tuesday, setTuesday] = useState({ from: "", to: "" });
  let [Wednesday, setWednesday] = useState({ from: "", to: "" });
  let [Thursday, setThursday] = useState({ from: "", to: "" });
  let [Friday, setFriday] = useState({ from: "", to: "" });
  let [Saturday, setSaturday] = useState({ from: "", to: "" });
  let [Sunday, setSunday] = useState({ from: "", to: "" });
  //Localstorage data:

  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentSocialMedia() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/bussinessDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setBussinessCount(res.data.data.length);

          if (res.data.data.length == 1) {
            setMonday({
              from: res.data.data[0].Monday.from,
              to: res.data.data[0].Monday.to,
            }),
              setTuesday({
                from: res.data.data[0].Tuesday.from,
                to: res.data.data[0].Tuesday.to,
              }),
              setWednesday({
                from: res.data.data[0].Wednesday.from,
                to: res.data.data[0].Wednesday.to,
              }),
              setThursday({
                from: res.data.data[0].Thursday.from,
                to: res.data.data[0].Thursday.to,
              }),
              setFriday({
                from: res.data.data[0].Friday.from,
                to: res.data.data[0].Friday.to,
              }),
              setSaturday({
                from: res.data.data[0].Saturday.from,
                to: res.data.data[0].Saturday.to,
              }),
              setSunday({
                from: res.data.data[0].Sunday.from,
                to: res.data.data[0].Sunday.to,
              }),
              setFormSubmitLoader(false);
            setUpdateToggle(true);
          } else {
            // toast.error("Data not added!");
            setUpdateToggle(false);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchCurrentSocialMedia();
  }, [key]);



  //Save Function
  async function handleFormSave(e) {
    e.preventDefault();
    let data = {
      URL_Alies,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
    };
    setFormSubmitLoader(true);
    try {
      api
        .post(`/bussinessDetail/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {

          reloadComponent()
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
        
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
    }
  }
  //Update Function
  async function handleFormUpdate(e) {
    e.preventDefault();
    let data = {
      URL_Alies,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(
          `/bussinessDetail/update_by_vcard_URL/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          reloadComponent()
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
    }
  }
  return (
    <>
      <div className="business_hour_container">
        <div className="title">
          <h4>Your Business Hour</h4>
          <div className="note">
            <small>
              <span>Note :</span>When users click any one of this time u
              scheduled that will <span>notify</span> by message with{" "}
              <span>paid or unpaid</span> visit that is your choice u can
              discuss with your client by call or directly.{" "}
            </small>
          </div>
        </div>
        <form className="business_box" method="POST" onSubmit={BussinessCount < 1 ? handleFormSave : handleFormUpdate}>
          <div class="cs-form">
            <h5>Monday</h5>
            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Monday.from}
              onChange={(e) => setMonday({ ...Monday, from: e.target.value })}
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Monday.to}
              onChange={(e) => setMonday({ ...Monday, to: e.target.value })}
            />
            </div>
  
          </div>
          <div class="cs-form">
            <h5>Tuesday</h5>
            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Tuesday.from}
              onChange={(e) => setTuesday({ ...Tuesday, from: e.target.value })}
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Tuesday.to}
              onChange={(e) => setTuesday({ ...Tuesday, to: e.target.value })}
            />
            </div>

          </div>
          <div class="cs-form">
            <h5>Wednesday</h5>
            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Wednesday.from}
              onChange={(e) =>
                setWednesday({ ...Wednesday, from: e.target.value })
              }
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Wednesday.to}
              onChange={(e) =>
                setWednesday({ ...Wednesday, to: e.target.value })
              }
            />
            </div>

          </div>
          <div class="cs-form">
            <h5>Thursday</h5>

            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Thursday.from}
              onChange={(e) =>
                setThursday({ ...Thursday, from: e.target.value })
              }
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Thursday.to}
              onChange={(e) => setThursday({ ...Thursday, to: e.target.value })}
            />
            </div>
     
          </div>
          <div class="cs-form">
            <h5>Friday</h5>

            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Friday.from}
              onChange={(e) => setFriday({ ...Friday, from: e.target.value })}
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Friday.to}
              onChange={(e) => setFriday({ ...Friday, to: e.target.value })}
            />
            </div>
 
          </div>
          <div class="cs-form">
            <h5>Saturday</h5>
            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Saturday.from}
              onChange={(e) =>
                setSaturday({ ...Saturday, from: e.target.value })
              }
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Saturday.to}
              onChange={(e) => setSaturday({ ...Saturday, to: e.target.value })}
            />
            </div>
     
          </div>
          <div class="cs-form">
            <h5>Sunday</h5>
            <div className="times">
            <input
              type="time"
              class="form-control"
              value={Sunday.from}
              onChange={(e) => setSunday({ ...Sunday, from: e.target.value })}
            />
            <div className="to">
              <p>To</p>
            </div>

            <input
              type="time"
              class="form-control"
              value={Sunday.to}
              onChange={(e) => setSunday({ ...Sunday, to: e.target.value })}
            />
            </div>

          </div>
          <div className="form_submit_actions">
            {BussinessCount < 1 ? (
              <div className="save" >
                <button type="submit">Save</button>
              </div>
            ) : (
              <div className="save">
                <button type="submit" >Update</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit_Business_Hour;
