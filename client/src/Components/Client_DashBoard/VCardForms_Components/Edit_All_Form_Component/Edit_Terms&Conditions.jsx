import React,{useState,useContext,useEffect} from "react";
import "./Edit_form_styles/Edit_Terms&Conditions.scss";
import { Editor } from "primereact/editor";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { AppContext } from "../../../Context/AppContext";

const Terms_Conditions = () => {
  let {URL_Alies}=useParams();
  let { FormSubmitLoader, setFormSubmitLoader } =
  useContext(AppContext);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let[TermCount,setTermCount]=useState(0);
    const [Terms_Conditions, setTerms_Conditions] = useState("");
    const [key, setKey] = useState(0);

    var reloadComponent = () => {
      setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
    };
    const api = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
  });
    useEffect(() => {
      api
        .get(`/termConditionDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setTerms_Conditions(res.data.data[0].Terms_Conditions);
          
          setTermCount(res.data.data.length);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }, [key]);

      //Localstorage data:
  let localStorageDatas=JSON.parse(localStorage.getItem('datas'));

  let formik = useFormik({
    initialValues: {
      URL_Alies:URL_Alies,
      Terms_Conditions:''
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:SocialMediaValidate,
 
    onSubmit: async (values) => {
      values.Terms_Conditions = stripHtmlTags(Terms_Conditions);
      setFormSubmitLoader(true);
      await api
        .post(`/termConditionDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)
          setTimeout(()=>{
           setTerms_Conditions('')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
       toast.error(error.response.data.message);
       console.log(error)
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleUpdate(e){
    e.preventDefault();
        let data={
          URL_Alies,
          Terms_Conditions
        }
        try{
          setFormSubmitLoader(true);
          await api
            .put(
              `/termConditionDetail/update/${URL_Alies}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorageDatas.token}`,
                },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
              reloadComponent();
              setTimeout(() => {
                setPrivacyPolicy("");
              }, 2000);
              setFormSubmitLoader(false);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
              console.log(error);
              setFormSubmitLoader(false);
            });
        }
        catch(error){
          toast.error(error.message)
        }
      }
  return (
    <>
      <div className="termsConition_container">
      <div className="title">
    {/* <h6>Link Your Social Medias</h6> */}

    <div className="note">
      <small><span>Note :</span>A <span>Terms and Conditions agreement </span> acts as a <span>legal contract between you (the company)</span> and the user..</small>
    </div>
  </div>
  {TermCount === 0 ?
     <form action="" onSubmit={formik.handleSubmit}>
     <div className="form_group">
       <label htmlFor="description">Terms & Conditions <sup>*</sup></label>
       <Editor
         value={Terms_Conditions}
         onTextChange={(e) => setTerms_Conditions(e.htmlValue)}
         style={{ height: "300px" }}
         className="texteditor"
         {...formik.getFieldProps('Terms_Conditions')}
       />
     </div>
     <div className="form_submit_actions">
       <button className="save" type="submit">Save</button>
       <button className="discard" onClick={formik.handleReset}>Clear</button>
     </div>
   </form>
  : 
      <form action="" onSubmit={handleUpdate}>
      <div className="form_group">
        <label htmlFor="description">
        Terms & Conditions <sup>*</sup>
        </label>
        <Editor
          value={Terms_Conditions}
          onTextChange={(e) => setTerms_Conditions(e.htmlValue)}
          style={{ height: "300px" }}
          className="texteditor"
        
         
        />
      </div>
      <div className="form_submit_actions">
        <button className="save" type="submit">
          Update
        </button>
      </div>
    </form>
  }
     
      </div>
    </>
  );
};

export default Terms_Conditions;
