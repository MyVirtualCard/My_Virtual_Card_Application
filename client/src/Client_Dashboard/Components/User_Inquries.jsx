import React, { useContext, useState, useEffect } from "react";
import "./Styles/Inquries.scss";
import Context from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
const User_Inquries = () => {
  let {
    user,
    userName,
    URL_Alies,
    setURL_Alies,
    setFormSubmitLoader,
    setCurrentTemplate,
    currentTemplate,
    ShowForm,
    setShowForm,
 
  } = useContext(Context);

   let[   AllFeedback,
    setAllFeedback]=useState([])
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [sepcificData, setSpecificData] = useState([]);
  let [detailShowToggle, setdetailShowToggle] = useState(false);
  let [Id, setID] = useState();

  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

//Server API
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
});
  async function fetchAllInquiry() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/inquiry/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res)
          setAllFeedback(res.data.data);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }

  useEffect(() => {
    fetchAllInquiry();
  }, [key]);
  //Delete Inquiry
  async function handleInquiryDelete() {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/inquiry/delete/${Id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success("Inquiry Sucessfully Deleted!");
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
        })
        .catch((error) => {
          toast.error("Failed to Delete!");
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  //Fetch Inquiry ID
  async function handleViewData(Id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/inquiry/specific/${Id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          reloadComponent();

          setSpecificData(res.data.data);
          setdetailShowToggle(true);
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
           <div className="inquiries_container">
      {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button onClick={handleInquiryDelete}>Yes</button>
              </div>
              <div className="cancel">
                <button onClick={() => setVcardDeleteToggle(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {detailShowToggle ? 
        <>
             <div className="view_inquiry_container">
       
      <div className="view_inquiry_box">
      <div className="close_icon" onClick={()=>setdetailShowToggle(false)}>
          <i className='bx bx-x' ></i>
          </div>
          <div className="title">
            <h3>
            Inquiry Details
            </h3>
      
          </div>
          <div className="all_details">
            <div className="detail">
              <div className="detail_title">
              <h4>Full Name</h4>
              </div>
             
              <div className="detail_content">
              <p>{sepcificData.Name}</p>
              </div>
           
            </div>
            <div className="detail">
              <div className="detail_title">
              <h4>Email Address</h4>
              </div>
             
              <div className="detail_content">
              <p>{sepcificData.Email}</p>
              </div>
           
            </div>
            <div className="detail">
              <div className="detail_title">
              <h4>Mobile Number</h4>
              </div>
             
              <div className="detail_content">
              <p>{sepcificData.MobileNumber ? sepcificData.MobileNumber : 'Null'}</p>
              </div>
           
            </div>
            <div className="detail">
              <div className="detail_title">
              <h4>Client Inquiry</h4>
              </div>
             
              <div className="detail_content">
              <p>{sepcificData.Message}</p>
              </div>
           
            </div>
            <div className="detail">
              <div className="detail_title">
              <h4>Inquiry Received</h4>
              </div>
             
              <div className="detail_content">
              <p>  {sepcificData.createdAt
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}</p>
              </div>
           
            </div>
          </div>
      </div>
     </div>
        </>
        : ''}

        <div className="table_container">
       
          <div className="title">
          <div className="title">
            <h5 className="fw-medium">All Inquiry</h5>
            <h4>
            <span className="material-symbols-outlined">
notifications_active
</span>
<small>{AllFeedback?.length}</small>
            </h4>
          </div>
          </div>

        
            <div className="container">
              <table className="table" id="example">
                <thead>
                  <tr>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "20%" }}
                    >
                      VCARD NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                      CLIENT NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "20%" }}
                    >
                      EMAIL
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "20%" }}
                    >
                      MOBILE NUMBER
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      RECEIVED AT
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "30%" }}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllFeedback.length>0 ?  
                  <>
                  {AllFeedback.map((data,index)=>{
                    return(
                      <tr key={index}>
                      <td>{URL_Alies}</td>
                      <td>{data.Name}</td>
                   
                      <td colSpan="1" className="text-center">
                       {data.Email}
                      </td>
                      <td>{data.MobileNumber ? data.MobileNumber : 'Null'}</td>
                      <td>
                      <small>
                              {data.createdAt
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </small>
                      </td>
                      <td>
                      <i className='bx bxs-low-vision' onClick={((e)=>handleViewData(data._id))}></i>
                    
                            <i
                              className="bx bx-trash"
                              style={{ color: "red" }}
                              onClick={() => {
                               setID(data._id)
                                setURL_Alies(data.URL_Alies);
                                setVcardDeleteToggle(true);
                              }}
                            ></i>
                      </td>
                    </tr>
                    )
                  })}
                  </>
                  
                  :    <tr>
                    <td></td>
                    <td></td>
                 
                    <td colSpan="1" className="text-center">
                      No Inquiries Found!
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>}
               
                </tbody>
              </table>
            </div>
        
        </div>
              
      </div>
    </>
  );
};

export default User_Inquries;
