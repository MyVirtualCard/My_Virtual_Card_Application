import React,{useState,useContext,useEffect} from "react";
import "./menuStyles/Appoinment.scss";
import Context from "../../UseContext/Context";
import axios from "axios";
import {toast,Toaster,useToaster} from "react-hot-toast";
import Footer from "../UserAdmin_Footer/Footer";
const Appoinment = () => {
  let {
    URL_Alies,
    setURL_Alies,
    userName,
    setFormSubmitLoader,
    setCurrentTemplate,
    currentTemplate,
    ShowForm,
    setShowForm,
    AllAppoinment,setAllAppoinment
  } = useContext(Context);

  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let[sepcificData,setSpecificData]=useState([]);
  let[detailShowToggle,setdetailShowToggle]=useState(false)
  let[Id,setID]=useState()

  const [key, setKey] = useState(0);
  

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  async function fetchCurrentPopUpBanner() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/appoinment/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
       setAllAppoinment(res.data.data)
       setFormSubmitLoader(false)
       
        })
        .catch((error) => {
   setFormSubmitLoader(false)
        });
    } catch (error) {
    console.log(error)
    setFormSubmitLoader(false)
    }
  };
  
  useEffect(() => {
    fetchCurrentPopUpBanner();
  }, [key]);
  //Delete Inquiry
  async function handleInquiryDelete() {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/appoinment/delete/${Id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success("Appoinment Sucessfully Deleted!");
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
  };
  //Fetch Inquiry ID
  async function handleViewData(Id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/appoinment/specific/${Id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
       
          setSpecificData(res.data.data)
 setdetailShowToggle(true)
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
        })
        .catch((error) => {
         console.log(error)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className="appoinment_container">
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
              <p>{sepcificData.FullName}</p>
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
              <h4>Appoinment Date</h4>
              </div>
             
              <div className="detail_content">
              <p> {sepcificData.Date
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}</p>
              </div>
           
            </div>
            <div className="detail">
              <div className="detail_title">
              <h4>Appoinment Time</h4>
              </div>
             
              <div className="detail_content">
              <p> {sepcificData.Time}</p>
              </div>
           
            </div>
          </div>
      </div>
     </div>
        </>
        : ''}
        <div className="inquiry_table">
          <div className="title">
            <h5 className="fw-medium">All Appoinments</h5>
            <h4>
            <span className="material-symbols-outlined">
notifications_active
</span>
<small>{AllAppoinment.length}</small>
            </h4>
          </div>

          <div className="appoinment_container table-responsive  ">
            <div className="container">
              <table className="table table-borderless table-hover rounded-3" id="example">
                <thead>
                  <tr>
                  <th
                      className="text-center fw-semibold"
                      style={{ width: "20%" }}
                    >
                      VCARD NAME
                    </th>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "20%" }}
                    >
                      CLIENT NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                     MOBILE NUMBER
                    </th>
                  

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "10%" }}
                    >
                       DATE
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                       TIME
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "40%" }}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllAppoinment.length>0 ?  
                  <>
                  {AllAppoinment.map((data,index)=>{
                    return(
                      <tr key={index}>
                      <td>{URL_Alies}</td>
                      <td>{data.FullName}</td>
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
                      <td>{data.Time}</td>
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
                      No Appoinment Found!
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
              {/* Footer */}
              <div className="row_3">
            <Footer />
          </div>
      </div>
    </>
  );
};

export default Appoinment;
