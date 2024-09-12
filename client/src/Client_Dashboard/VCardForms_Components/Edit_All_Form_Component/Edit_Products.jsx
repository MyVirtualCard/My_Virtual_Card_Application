import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Products.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { ToastContainer, toast, Bounce } from "react-toastify";
import { convertToBase64ProductImage } from "../../../Helper/convert";
import { ProductValidateShema } from "../../../Helper/ProductValidate";
import Context from "../../../Context/GlobalContext";
const Products = () => {
  let { URL_Alies } = useParams();
  let {
    user,
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    setShowForm,
    successMessage,
    setSuccessMessage,
    successPopupOpen,
    setSuccessPopupOpen,
    errorMessage,
    setErrorMessage,
    errorPopupOpen,
    setErrorPopupOpen,
  } = useContext(Context);
  let [AllProduct, setAllProduct] = useState();
  let [ProductCount, setProductCount] = useState(0);
  let [ProductViewToggle, setProductViewToggle] = useState(false);
  let [productFormOpen, setProductFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [ProductName, setProductName] = useState();
  let [ProductURL, setProductURL] = useState();
  let [ProductDescription, setProductDescription] = useState();
  let [ProductImage, setProductImage] = useState(null);
  let[ProductPreview,setProductPreview]=useState(null)
;  let [ProductId, setProductId] = useState();
  let [ProductType, setProductType] = useState();
  let [ProductImageLink, setProductImageLink] = useState();
  let [ProductPrice, setProductPrice] = useState();
  let[deleteParams,setDeleteParams]=useState();
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };



  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function fetchCurrentProduct() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/productDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No Product added!");
            setFormSubmitLoader(false);
          } else {
            setAllProduct(res.data.data);
            setProductCount(res.data.data.length);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setProductFormOpen(false);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);

      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchCurrentProduct();
  }, [key]);
  let formik = useFormik({
    initialValues: {
      ProductName: "",
      URL_Alies: URL_Alies,
      ProductURL: "",
      ProductDescription: "",
      ProductImage: undefined,
      ProductType: "ImageUpload",
      ProductImageLink: "",
      ProductPrice: 0,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ProductValidateShema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("URL_Alies", URL_Alies);
      formData.append("ProductName", values.ProductName);
      formData.append("ProductPrice", values.ProductPrice);
      formData.append("ProductType", values.ProductType);
      formData.append("ProductURL", values.ProductURL);
      formData.append("ProductImageLink", values.ProductImageLink);
      formData.append("ProductImage", ProductImage);
      formData.append(
        "ProductDescription",
        (values.ProductDescription = stripHtmlTags(ProductDescription))
      );

      setFormSubmitLoader(true);
      await api
        .post(`/productDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(false);
          formik.setFieldValue("ProductDescription", ""),
            (formik.values.ProductDescription = "");
          setProductDescription("");
          values.ProductDescription = stripHtmlTags("");
          values.ProductImage = undefined;
          setProductPreview(null);
          setProductImage(undefined);
          formik.handleReset();

          setProductCount(++ProductCount);
          toast.success(res.data.message);

          setFormSubmitLoader(false);

          if (currentPlan === "Free Plan" && ProductCount == 2) {
            setTimeout(() => {
              setShowForm("Galleries");
            }, 2000);
          }
          if (currentPlan === "Basic" && ProductCount == 4) {
            setTimeout(() => {
              setShowForm("Galleries");
            }, 2000);
          }
          if (currentPlan === "Standard" && ProductCount == 6) {
            setTimeout(() => {
              setShowForm("Galleries");
            }, 2000);
          }
          if (currentPlan === "Enterprises" && ProductCount == 10) {
            setTimeout(() => {
              setShowForm("Galleries");
            }, 2000);
          }

          setTimeout(() => {
            setProductFormOpen(false);
            reloadComponent();
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
          setProductFormOpen(false);
          setUpdateFormOpen(false);
        });
    },
  });

  async function handleProductView(id) {
    setProductViewToggle(true);
    try {
      await api
        .get(`/productDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setProductViewToggle(true);
          setProductName(res.data.data.ProductName);
          setProductImage(res.data.data.ProductImage);
          setProductPrice(res.data.data.ProductPrice);
          setProductURL(res.data.data.ProductURL);
          setProductDescription(
            (res.data.data.ProductDescription = stripHtmlTags(
              res.data.data.ProductDescription
            ))
          );
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleProductEdit(id) {
    setFormSubmitLoader(true);

    try {
      await api
        .get(`/productDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setProductFormOpen(true);
          setUpdateFormOpen(true);
          setProductPrice(res.data.data.ProductPrice);
          setProductName(res.data.data.ProductName);
          setProductURL(res.data.data.ProductURL);
          setProductDescription(res.data.data.ProductDescription);
          setProductImage(res.data.data.ProductImage);
          setProductImageLink(res.data.data.ProductImageLink);
          setProductType(res.data.data.ProductType);
          setProductId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleProductUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("ProductName", ProductName);
    formData.append("ProductPrice", ProductPrice);
    formData.append("ProductType", ProductType);
    formData.append("ProductURL", ProductURL);
    formData.append("ProductImageLink", ProductImageLink);
    formData.append("ProductImage", ProductImage);
    formData.append(
      "ProductDescription",
      (ProductDescription = stripHtmlTags(ProductDescription))
    );
    let data = {
      URL_Alies,
      ProductName,
      ProductImage,
      ProductURL,
      ProductPrice,
      ProductType,
      ProductImageLink,
      ProductDescription,
    };
    try {
      api
        .put(`/productDetail/updateID/${ProductId}`, formData, {
          headers: {
           "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          setUpdateFormOpen(false);
          reloadComponent();
          setProductPreview(null)
          setTimeout(() => {
            setProductImage(undefined);
            setProductFormOpen(false);
          }, 1000);
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setProductFormOpen(false);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleProductDelete(url,id) {

    if(url !=null){
      setDeleteParams(url.split('/')[0].slice(22,150));
    }
    else{
      setDeleteParams(id)
    }
    

    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/productDetail/deleteID/${deleteParams}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setProductCount(--ProductCount);

          toast.success(res.data.message);
          reloadComponent();
          setFormSubmitLoader(false);
          setDeleteParams(null)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
          setDeleteParams(null)
        });
    } catch (error) {
      console.log(error);
    }
  }
  // const handleProductImageChange = (event) => {
  //   const ProductImage = event.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(ProductImage);
  //   reader.onload = () => {
  //     formik.setFieldValue("ProductImage", reader.result);
  //     setProductImage(reader.result);
  //   };
  // };
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setProductPreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("ProductImage", ProductPreview);
  };
  const handleUpdateProductImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setProductPreview(URL.createObjectURL(file)); // Show a preview of the image
    //  {!updateFormOpen ? formik.setFieldValue("ServiceImage", ServicePreview): setServiceImage(ServicePreview)}
  };
  // Handler function for the change event
  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <>
      <div className="product_container">
        <div className="product_plan_title">
          <p>
            <strong>{currentPlan} </strong>&nbsp; Subscribed!
          </p>
        </div>

        {!productFormOpen ? (
          <>
            <div className="add_new_product">
              {currentPlan === "Free Plan" && ProductCount != 2 ? (
                <button
                  onClick={() => {
                    setProductFormOpen(true),
                      setUpdateFormOpen(false),
                      setProductImage(undefined),
                      (formik.values.ProductImage = undefined),
                      setProductDescription(undefined),
                      (formik.values.ProductDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Product
                </button>
              ) : (
                ""
              )}
              {currentPlan === "Basic" && ProductCount != 4 ? (
                <button
                  onClick={() => {
                    setProductFormOpen(true),
                      setUpdateFormOpen(false),
                      setProductImage(undefined),
                      (formik.values.ProductImage = undefined),
                      setProductDescription(undefined),
                      (formik.values.ProductDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Product
                </button>
              ) : (
                ""
              )}
              {currentPlan === "Standard" && ProductCount != 6 ? (
                <button
                  onClick={() => {
                    setProductFormOpen(true),
                      setUpdateFormOpen(false),
                      setProductImage(undefined),
                      (formik.values.ProductImage = undefined),
                      setProductDescription(undefined),
                      (formik.values.ProductDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Product
                </button>
              ) : (
                ""
              )}
              {currentPlan === "Enterprises" && ProductCount != 10 ? (
                <button
                  onClick={() => {
                    setProductFormOpen(true),
                      setUpdateFormOpen(false),
                      setProductImage(undefined),
                      (formik.values.ProductImage = undefined),
                      setProductDescription(undefined),
                      (formik.values.ProductDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Product
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="plan_based_service_add_note">
              <div className="note">
                {currentPlan === "Free Plan" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Product addOn limit :
                      <strong> {ProductCount} / 2 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "Basic" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Product addOn limit :
                      <strong> {ProductCount} / 4 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "Standard" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Product addOn limit :
                      <strong> {ProductCount} / 6 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "Enterprises" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Product addOn limit :
                      <strong> {ProductCount} / 10 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="product_list_table table-responsive container w-100 rounded-3">
              <table className="table table-borderless rounded-3" id="example">
                <thead className="table-secondary rounded-3">
                  <tr>
                    <th className="fw-bold">PRODUCT IMAGE</th>

                    <th className="fw-bold" style={{ width: "20%" }}>
                      PRODUCT NAME
                    </th>
                    <th className="fw-bold" style={{ width: "30%" }}>
                      PRODUCT DESCRIPTION
                    </th>
                    <th className="fw-bold" style={{ width: "10%" }}>
                      {" "}
                      PRICE
                    </th>
                    <th className="fw-bold" style={{ width: "20%" }}>
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className=" shadow-sm">
                  {AllProduct != undefined && AllProduct.length != 0 ? (
                    <>
                      {AllProduct.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td
                              className="h-100 align-middle"
                              style={{ width: "20%" }}
                            >
                              {data.ProductType == "ImageUpload" ? (
                                <>
                                  {data.ProductImage ? (
                                    // <img
                                    //   src={
                                    //     data.ServiceImage != undefined
                                    //       ? data.ServiceImage
                                    //       : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                    //   }
                                    //   alt="ServiceImage"
                                    //   name="ServiceImage"
                                    // />
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_BACKEND_API_URL
                                      }/${
                                        data.ProductImage
                                      }`}
                                      className="ProductImage"
                                      alt="ProductImage"
                                    />
                                  ) : (
                                    "Null"
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                              {data.ProductType == "Image_Address_Link" ? (
                                <>
                                  {data.ProductImageLink.length != 0 ? (
                                    <img
                                      src={
                                        data.ProductImageLink.length != 0
                                          ? data.ProductImageLink
                                          : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                      }
                                      alt="product_image"
                                    />
                                  ) : (
                                    "Null"
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </td>
                            <td
                              className="h-100 align-middle"
                              style={{ width: "20%" }}
                            >
                              {data.ProductName}
                            </td>
                            <td
                              className="h-100 align-middle"
                              style={{ width: "30%" }}
                            >
                              {data.ProductDescription.slice(0, 20)}
                            </td>
                            <td
                              className="h-100 align-middle"
                              style={{ width: "10%" }}
                            >
                              Rs:&nbsp;{data.ProductPrice}
                            </td>
                            <td
                              className="h-100 align-middle"
                              style={{ width: "20%" }}
                            >
                              <i
                                className="bx bxs-show"
                                style={{ color: "skyBlue" }}
                                onClick={() => handleProductView(data._id)}
                              ></i>
                              <i
                                className="bx bx-edit"
                                style={{ color: "#6571FF" }}
                                onClick={() => handleProductEdit(data._id)}
                              ></i>
                              <i
                                className="bx bx-trash-alt"
                                style={{ color: "red" }}
                                onClick={() => handleProductDelete(data.ProductImage,data._id)}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Products Added!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* //Create New Product Form */}

            <div
              className="create_new_product_container"
              // id={productFormOpen ? "shadow_background" : ""}
            >
              <div
                className="create_new_product_box"
                // id={productFormOpen ? "productOpen" : "productClose"}
              >
                <div className="title">
                  <p>{updateFormOpen ? "Update Product" : "New Product"}</p>

                  <i
                    className="bx bx-x"
                    onClick={() => {
                      setProductFormOpen(false), setUpdateFormOpen(false);
                    }}
                  ></i>
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="form_group">
                    <label htmlFor="ProductName">
                      Product Name <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Product Title"
                      id="ProductName"
                      name="ProductName"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setProductName(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen ? ProductName : formik.values.ProductName
                      }
                      className={
                        formik.errors.ProductName && formik.touched.ProductName
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ProductName}</div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="ProductURL">Product URL</label>
                    <input
                      type="text"
                      placeholder="Paste Product URL"
                      id="ProductURL"
                      name="ProductURL"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setProductURL(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen ? ProductURL : formik.values.ProductURL
                      }
                      className={
                        formik.errors.ProductURL && formik.touched.ProductURL
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ProductURL}</div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="product_currency">
                      Currency<sup>(Default)</sup>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Product Currency"
                      value="₹"
                      readOnly
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="ProductPrice">Price</label>
                    <input
                      type="text"
                      placeholder="Enter Product Price"
                      id="ProductPrice"
                      name="ProductPrice"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setProductPrice(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen
                          ? ProductPrice
                          : formik.values.ProductPrice
                      }
                      className={
                        formik.errors.ProductPrice &&
                        formik.touched.ProductPrice
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ProductPrice}</div>
                  </div>
                  <div className="form_group productDescription editor">
                    <label htmlFor="ProductDescription">
                      Description <sup>*</sup>
                    </label>

                    <Editor
                      id="ProductDescription"
                      name="ProductDescription"
                      {...formik.getFieldProps("ProductDescription")}
                      value={
                        updateFormOpen
                          ? ProductDescription
                          : formik.values.ProductDescription
                      }
                      onTextChange={
                        updateFormOpen
                          ? (e) => setProductDescription(e.htmlValue)
                          : (e) => {
                              formik.setFieldValue(
                                "ProductDescription",
                                e.htmlValue
                              ),
                                setProductDescription(e.htmlValue);
                            }
                      }
                      placeholder="Enter Short Description"
                      style={{ height: "130px" }}
                    />
                    {/* <ReactQuill
                  modules={modules}
                  formats={formats}
                  id="ProductDescription"
                  name="ProductDescription"
                  {...formik.getFieldProps("ProductDescription")}
                  value={
                    updateFormOpen
                      ? ProductDescription
                      : formik.values.ProductDescription
                  }
                  onChange={
                    updateFormOpen
                      ? (e) => setProductDescription(e)
                      : (e) => {
                          formik.setFieldValue("ProductDescription", e),
                            setProductDescription(e);
                        }
                  }
                  placeholder="Enter Short Description"
                  // style={{ height: "180px" }}
                /> */}
                    <div className="error">
                      {formik.errors.ProductDescription}
                    </div>
                  </div>

                  <div className="form_group productImage">
                    <div className="image_upload_type">
                      <div className="banner_type">
                        <label htmlFor="Service">Product Image Type</label>
                        <select
                          name="ProductType"
                          onBlur={formik.handleBlur}
                          onChange={
                            updateFormOpen
                              ? (e) => setProductType(e.target.value)
                              : formik.handleChange
                          }
                          value={
                            updateFormOpen
                              ? ProductType
                              : formik.values.ProductType
                          }
                        >
                          <option value="ImageUpload">ImageUpload</option>
                          <option value="Image_Address_Link">
                            Image_Address_Link
                          </option>
                        </select>
                      </div>
                    </div>
                    {!updateFormOpen ? (
                      <>
                        {formik.values.ProductType == "ImageUpload" ? (
                          <>
                            <label htmlFor="Image">
                              {ProductPreview == null ? 
                              
                              <img
                              src={
                                ProductImage != null ||
                                ProductImage != undefined
                                  ? ProductImage
                                  : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                              }
                              alt="Image"
                            />
                              :
                              <img
                              src={
                                ProductPreview != null
                                  ? ProductPreview
                                  : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                              }
                              alt="Image"
                            />
                              }
                            
                              {/* <i className="bx bxs-edit-location"></i> */}
                            </label>
                            <p>
                              <strong>Note :</strong> Max file size limit 3MB
                            </p>
                            <small>
                              Allowed file types: png, jpg, jpeg,.gif.
                            </small>
                            <input
                              type="file"
                              id="ProductImage"
                              name="ProductImage"
                              accept="image/*"
                              onChange={handleProductImageChange}
                              onBlur={formik.handleBlur}
                            />
                            <div className="error">
                              {formik.errors.ProductImage}
                            </div>
                          </>
                        ) : (
                          <div className="form_group url_link_input_group">
                            {updateFormOpen ? (
                              <img
                                src={
                                  ProductImageLink != null &&
                                  ProductImageLink != undefined &&
                                  ProductImageLink.length > 0
                                    ? ProductImageLink
                                    : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                }
                                alt=""
                              />
                            ) : (
                              <img
                                src={
                                  formik.values.ProductImageLink != null &&
                                  formik.values.ProductImageLink != undefined &&
                                  formik.values.ProductImageLink.length > 0
                                    ? formik.values.ProductImageLink
                                    : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                }
                                alt=""
                                className="banner_address_image"
                              />
                            )}
                            <label htmlFor="VCardName">
                              Paste Image Address
                            </label>

                            <input
                              type="text"
                              placeholder="Eg : https://img.arstostech.com/premium-photo"
                              name="ProductImageLink"
                              id="ProductImageLink"
                              onBlur={formik.handleBlur}
                              onChange={
                                updateFormOpen
                                  ? (e) => setProductImageLink(e.target.value)
                                  : formik.handleChange
                              }
                              value={
                                updateFormOpen
                                  ? ProductImageLink
                                  : formik.values.ProductImageLink
                              }
                              className={
                                formik.errors.ProductImageLink &&
                                formik.touched.ProductImageLink
                                  ? "input_error"
                                  : "input_success"
                              }
                            />
                            <div className="error">
                              {formik.errors.ProductImageLink}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {ProductType == "ImageUpload" ? (
                          <>
                            <label htmlFor="Image">
                              {/* <img
                                src={
                                  ProductImage != null
                                    ? ProductImage
                                    : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                }
                                alt="Image"
                              /> */}
                                {ProductPreview == null ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_BACKEND_API_URL
                                  }/${ProductImage}`}
                                  className="ProductImage"
                                  alt="ProductImage"
                                />
                              ) : (
                                <img
                                  src={ProductPreview}
                                  className="ProductImage"
                                  alt="ProductImage"
                                />
                              )}
                            </label>
                            <p>
                              <strong>Note :</strong> Max file size limit 3MB
                            </p>
                            <small>
                              Allowed file types: png, jpg, jpeg,.gif.
                            </small>
                            <input
                              type="file"
                              id="ProductImage"
                              name="ProductImage"
                              accept="image/*"
                              onChange={handleUpdateProductImageChange}
                              onBlur={formik.handleBlur}
                            />
                            <div className="error">
                              {formik.errors.ProductImage}
                            </div>
                          </>
                        ) : (
                          <div className="form_group url_link_input_group">
                            <img
                              src={
                                ProductImageLink != null &&
                                ProductImageLink != undefined &&
                                ProductImageLink.length > 0
                                  ? ProductImageLink
                                  : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                              }
                              alt=""
                              className="banner_address_image"
                            />
                            <label htmlFor="VCardName">
                              Update Image Address
                            </label>
                            <input
                              type="text"
                              placeholder="Eg : https://img.arstostech.com/premium-photo"
                              name="ProductImageLink"
                              id="ProductImageLink"
                              onBlur={formik.handleBlur}
                              onChange={
                                updateFormOpen
                                  ? (e) => setProductImageLink(e.target.value)
                                  : formik.handleChange
                              }
                              value={
                                updateFormOpen
                                  ? ProductImageLink
                                  : formik.values.ProductImageLink
                              }
                              className={
                                formik.errors.ProductImageLink &&
                                formik.touched.ProductImageLink
                                  ? "input_error"
                                  : "input_success"
                              }
                            />
                            <div className="clear_action">
                              <button
                                className="clear_btn"
                                type="button"
                                onClick={() => setProductImageLink("")}
                              >
                                clear
                              </button>
                            </div>
                            <div className="error">
                              {formik.errors.ProductImageLink}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="form_submit_actions">
                    <div className="save">
                      {updateFormOpen ? (
                        <button type="submit" onClick={handleProductUpdate}>
                          Update
                        </button>
                      ) : (
                        <button type="submit">
                          Save<i className="bx bxs-save"></i>
                        </button>
                      )}
                    </div>
                    {!updateFormOpen ? (
                      <div className="discard">
                        <button type="button" onClick={formik.handleReset}>
                          Clear
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}


        {/* //Product  Detail Box */}

        <div
          className="view_new_service_container"
          id={ProductViewToggle ? "shadow_background" : ""}
        >
          <div
            className="view_new_service_box"
            id={ProductViewToggle ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Product Detail</p>
              <i
                className="bx bx-x"
                onClick={() => setProductViewToggle(false)}
              ></i>
            </div>
            <div className="details_container">
              <div className="service_name">
                <div className="service_title">Product Name</div>
                <div className="name">
                  <p>{ProductName != undefined ? ProductName : "N/A"}</p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Product Description</div>
                <div className="name">
                  <p>
                    {ProductDescription != undefined
                      ? stripHtmlTags(ProductDescription)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Product Price</div>
                <div className="name">
                  <p>
                    {ProductPrice != undefined ? `₹ ${ProductPrice}` : "₹ 0"}
                  </p>
                </div>
              </div>
              <div className="service_url">
                <div className="service_title">Product URL</div>
                <div className="name">
                  <a href={ProductURL} target="_blank">
                    {ProductURL != undefined ? ProductURL : "N/A"}
                  </a>
                </div>
              </div>
              <div className="service_image">
                <div className="service_title">Product Image</div>
                <div className="service_image">
                  <img
                    src={
                      ProductImage != "null"
                        ? ProductImage
                        : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                    }
                    alt="service"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
