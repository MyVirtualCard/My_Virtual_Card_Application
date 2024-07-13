import React, { useState, useContext, useRef, useEffect } from "react";
import "./Edit_form_styles/Edit_BasicForm.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import Context from "../../../../UseContext/Context";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../../../Helper/convert";
import { useParams } from "react-router-dom";
import { BasicDetailValidate } from "../../../../Helper/BasicDetailValiate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
const BasicForm = () => {
  let { URL_Alies } = useParams();
  let { setURL_Alies, FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(Context);

    let[UpdateButtonToggle,setUpdateButtonToggle]=useState(false);
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Occupation, setOccupation] = useState();
  const [Description, setDescription] = useState();

  const [Profile, setProfile] = useState();

  let [Banner, setBanner] = useState();
  let [BannerName, setBannerName] = useState("");
  let [FirstName, setFirstName] = useState();
  let [LastName, setLastName] = useState();
  let [Email, setEmail] = useState();
  let [MobileNumber, setMobileNumber] = useState();
  let [AlternateEmail, setAlternateEmail] = useState();
  let [AlternateMobileNumber, setAlternateMobileNumber] = useState();
  let [Location, setLocation] = useState();
  let [JobTitle, setJobTitle] = useState();
  let [InquiryToggleSwitch, setInquiryToggleSwitch] = useState(true);
  let [QRToggleSwitch, setQRToggleSwitch] = useState(true);
  let [AppoinmentToggleSwitch, setAppoinmentToggleSwitch] = useState(false);
  let [ContactToggleSwitch, setContactToggleSwitch] = useState(true);

  let [imagePath, setImagePath] = useState(null);
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadProfile = async (e) => {
    let base64 = await convertToBase64Profile(e.target.files[0]);

    setProfile(base64);
  };
  const onUploadBanner = async (e) => {
    let base64 = await convertToBase64Banner(e.target.files[0]);

    setBanner(base64);
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  async function fetchURL_Form() {
    try {
      setFormSubmitLoader(true);
      api
        .get(
          `/vcard_URL/specific_vcard/${URL_Alies}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          setURL_Alies(URL_Alies)
          setVCardName(res.data.data.VCardName);
          setOccupation(res.data.data.Occupation);
          setDescription(res.data.data.Description);
          setProfile(res.data.data.Profile);
          setBanner(res.data.data.Banner);
         
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
  async function fetchBasicData() {
    try {
      setFormSubmitLoader(true);
      api
        .get(
          `/basicDetail/${URL_Alies}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {

          if(res.data.data.length == 1){
            setUpdateButtonToggle(true)
            setFirstName(res.data.data[0].FirstName);
            setLastName(res.data.data[0].LastName);
            setEmail(res.data.data[0].Email);
            setMobileNumber(res.data.data[0].MobileNumber);
            setAlternateEmail(res.data.data[0].AlternateEmail);
            setAlternateMobileNumber(res.data.data[0].AlternateMobileNumber);
            setLocation(res.data.data[0].Location);
            setJobTitle(res.data.data[0].JobTitle);
            setInquiryToggleSwitch(res.data.data[0].InquiryToggleSwitch);
            setQRToggleSwitch(res.data.data[0].QRToggleSwitch);
            setAppoinmentToggleSwitch(
              res.data.data[0].AppoinmentToggleSwitch
            );
            setAppoinmentToggleSwitch(
              res.data.data[0].AppoinmentToggleSwitch
            );
            setFormSubmitLoader(false);
          }
          else{
            // toast.error('Basic Detail Not Created!');
            setUpdateButtonToggle(false)
            setFormSubmitLoader(false)
          }
     
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchURL_Form()
    fetchBasicData();
  }, [key]);

  // let formik = useFormik({
  //   initialValues: {
  //     VCardName: '',
  //     Occupation: "",
  //     Description: "",
  //     Profile: undefined,
  //     Banner: null,
  //     BannerName: "",
  //     FirstName: "",
  //     LastName: "",
  //     Email: "",
  //     MobileNumber: "",
  //     AlternateEmail: "",
  //     AlternateMobileNumber: "",
  //     Location: "",
  //     JobTitle: "",
  //     InquiryToggleSwitch: true,
  //     QRToggleSwitch: true,
  //     AppoinmentToggleSwitch: false,
  //     ContactToggleSwitch: true,
  //   },
  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   validate: BasicDetailValidate,

  //   onSubmit: async (values) => {

  //     values = await Object.assign(values, { Profile: Profile || "" });
  //     values = await Object.assign(values, { Banner: Banner || "" });
  //     values.Description = stripHtmlTags(Description);
  //     setFormSubmitLoader(true);
  //     await axios
  //       .put(`http://localhost:3001/basicDetail/update_by_userName/${localStorageDatas.userName}`, values, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorageDatas.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setFormSubmitLoader(false);
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //         console.log(error);
  //         setFormSubmitLoader(false);
  //       });
  //   },
  // });
  async function handleURLFormUpdate(e) {
    e.preventDefault();
    let data = {
      URL_Alies,
      VCardName,
      Occupation,
      Description,
      Profile,
      Banner
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(
          `/vcard_URL/update_by_vcardUrl/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleBasicDetailSave(e){
    setFormSubmitLoader(true)
    e.preventDefault();
    let data = {
      URL_Alies,
      FirstName,
      LastName,
      Email,
      MobileNumber,
      AlternateEmail,
      AlternateMobileNumber,
      Location,
      JobTitle,
      InquiryToggleSwitch,
      QRToggleSwitch,
      AppoinmentToggleSwitch,
      ContactToggleSwitch,
    };
    await api
    .post(`/basicDetail/${URL_Alies}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageDatas.token}`,
      },
    })
    .then((res) => {
      reloadComponent()
      toast.success(res.data.message);
      setFormSubmitLoader(false);

    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log(error);
      setFormSubmitLoader(false);
    });
  }
  async function handleBasicFormUpdate(e) {
    e.preventDefault();
    let data = {
      FirstName,
      LastName,
      Email,
      MobileNumber,
      AlternateEmail,
      AlternateMobileNumber,
      Location,
      JobTitle,
      InquiryToggleSwitch,
      QRToggleSwitch,
      AppoinmentToggleSwitch,
      ContactToggleSwitch,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(
          `/basicDetail/update_by_vcard_URL/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
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
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="basicform_container">
        <Toaster position="top-right" />
        <div className="form1_container_box">
          <form encType="multipart/form-data" onSubmit={handleURLFormUpdate}>
            <div className="form_group">
              <label htmlFor="URL_Alies">
                VCard URL <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard URL"
                value={URL_Alies}
                onChange={(e)=>setURL_Alies(e.target.value)}
                // {...formik.getFieldProps("URL_Alies", URL_Alies)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="VCardName">
                VCard Name <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard Name"
                value={VCardName}
                onChange={(e) => setVCardName(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="occupation">
                Occupation<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Occupation"
                value={Occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              <Editor
                value={Description}
                onTextChange={(e) => setDescription(e.htmlValue)}
                id="Description"
                name="Description"
                style={{ height: "180px" }}
                placeholder="Enter Short Description..!"
              />
            </div>
            <div className="form_group double_col_inputs">
              <div className="first">
                <label htmlFor="Profile">
                  Profile Image <sup>*</sup>
                </label>
                <label htmlFor="Profile">
                  <img
                    src={
                      Profile != undefined
                        ? Profile
                        : "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg?t=st=1716040955~exp=1716044555~hmac=605273d0e1789be0644e11ceb509699fc6908463eed64554ad5184feb50cc3fa&w=740"
                    }
                    className="Profile"
                    alt="Profile"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  onChange={onUploadProfile}
                  type="file"
                  name="Profile"
                  id="Profile"
                />
              </div>
              <div className="second">
                <label htmlFor="Banner">
                  Banner Image <sup>*</sup>
                </label>
                <label htmlFor="Banner">
                  <img
                    src={
                      Banner != null
                        ? Banner
                        : "https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826"
                    }
                    className="Banner"
                    alt="Banner"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  type="file"
                  onChange={onUploadBanner}
                  name="Banner"
                  id="Banner"
                />
              </div>
            </div>
            

            <div className="form_submit_actions">
              <button className="save" type="submit">
                Update
              </button>
            </div>
          </form>
          <form encType="multipart/form-data" onSubmit={UpdateButtonToggle ? handleBasicFormUpdate : handleBasicDetailSave} >
            <div className="form2_title">
              <h4>VCard Details</h4>
            </div>
            <div className="form_group">
              <label htmlFor="firstName">
                First Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your FirstName"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="lastName">
                Last Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your LastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Phone Number<sup>*</sup>
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                value={MobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Email</label>
              <input
                type="email"
                placeholder="Alternate Email"
                value={AlternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Phone</label>
              <input
                type="tel"
                placeholder="Alternate Phone"
                value={AlternateMobileNumber}
                onChange={(e) => setAlternateMobileNumber(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="location">
                Location<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Location"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="job">
                Job Title<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={JobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="actions">
              <p>Enable Inquiry Form :</p>
              <input
                id="InquiryToggleSwitch"
                name="InquiryToggleSwitch"
                type="checkbox"
                checked={InquiryToggleSwitch}
                onClick={()=>setInquiryToggleSwitch(!InquiryToggleSwitch)}
              />
            </div>
            <div className="actions">
              <p>Enable QR Code :</p>
              <input
                id="QRToggleSwitch"
                name="QRToggleSwitch"
                type="checkbox"
                checked={QRToggleSwitch}
                onClick={()=>setQRToggleSwitch(!QRToggleSwitch)}
              />
            </div>
            <div className="actions">
              <p>Enable Appoinment:</p>
       
          
              <input
                id="AppoinmentToggleSwitch"
                name="AppoinmentToggleSwitch"
                type="checkbox"
                checked={AppoinmentToggleSwitch}
                onClick={()=>setAppoinmentToggleSwitch(!AppoinmentToggleSwitch)}
              />
            </div>
            <div className="actions">
              <p>Enable Add To Contact:</p>
              <input
                id="ContactToggleSwitch"
                name="ContactToggleSwitch"
                type="checkbox"
                checked={ContactToggleSwitch}
                onClick={()=>setContactToggleSwitch(!ContactToggleSwitch)}
              />
            </div>

            <div className="form_submit_actions">
            {UpdateButtonToggle ? <button className="save" type="submit">
                Update
              </button> : <button className="save" type="submit" >
                Save
              </button>}  
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicForm;
