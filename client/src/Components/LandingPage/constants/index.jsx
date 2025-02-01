import React,{useState} from 'react';

// Session1
import Mouse from '../../../assets/Lotte_Animation/MouseScrollDown.json';
export const Session1MouseScroll = {
  loop: true,
  autoplay: true,
  animationData: Mouse,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
//...................................................
// Session2
import Session2BackImage from '../../../assets/Lotte_Animation/Back_Anime2.json';
import Session2BackImage2 from '../../../assets/Lotte_Animation/Gradient_Back7.json';
import Session2Robo from '../../../assets/Lotte_Animation/Robot-12.json';
import MobileView from '../../../assets/Lotte_Animation/Mobile3.json';
import vcard1 from "../../../assets/Landing_Page/VCard_Designs/GYM.png";
import vcard2 from "../../../assets/Landing_Page/VCard_Designs/FASHION.png";
import vcard3 from "../../../assets/Landing_Page/VCard_Designs/MANAGER.png";
import vcard4 from "../../../assets/Landing_Page/VCard_Designs/TAXI.png";
import vcard5 from "../../../assets/Landing_Page/VCard_Designs/CORPORATE.png";
import vcard6 from "../../../assets/Landing_Page/VCard_Designs/BEAUTYPARLOR.png";
import vcard7 from "../../../assets/Landing_Page/VCard_Designs/DOCTOR.png";
import vcard8 from "../../../assets/Landing_Page/VCard_Designs/CAB.png";
import vcard9 from "../../../assets/Landing_Page/VCard_Designs/ADVOCATE.png";
import vcard10 from "../../../assets/Landing_Page/VCard_Designs/EDUCATION.png";
export const Session2BackOptions = {
  loop: true,
  autoplay: true,
  animationData: Session2BackImage,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session2BackOptions2 = {
  loop: true,
  autoplay: true,
  animationData: Session2BackImage2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session2LeftRobo = {
  loop: true,
  autoplay: true,
  animationData: Session2Robo,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session2LeftMobileOption = {
  loop: true,
  autoplay: true,
  animationData: MobileView,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
 // Template List
 export let StaticTemplateList = [
  {
    Id: 1,
    TemplateCount: 1,
    VCard_Name: "CORPORATE_MANAGER",
    VCard_Image: vcard3,
    VCard_Link: "https://myvirtualcard.in/Manager_Preview",
  },

  {
    Id: 2,
    TemplateCount: 2,
    VCard_Name: "FASHION_DESIGNER",
    VCard_Image: vcard2,
    VCard_Link: "https://myvirtualcard.in/fashion_Designer_Preview",
  },
  {
    Id: 3,
    TemplateCount: 3,
    VCard_Name: "GYM_TRAINER",
    VCard_Image: vcard1,
    VCard_Link: "https://myvirtualcard.in/Gym_Trainer_Preview",
  },
  {
    Id: 4,
    TemplateCount: 4,
    VCard_Name: "TAXI_SERVICE",
    VCard_Image: vcard4,
    VCard_Link: "https://myvirtualcard.in/Taxi_Service_Preview",
  },
  {
    Id: 5,
    TemplateCount: 5,
    VCard_Name: "BUSSINESS_CONSULTANT",
    VCard_Image: vcard5,
    VCard_Link: "https://myvirtualcard.in/Corporate_Company_Preview",
  },
  {
    Id: 6,
    TemplateCount: 6,
    VCard_Name: "BEAUTY_PARLOR",
    VCard_Image: vcard6,
    VCard_Link: "https://myvirtualcard.in/Beauty_Parlor_Preview",
  },
  {
    Id: 7,
    TemplateCount: 7,
    VCard_Name: "DOCTOR",
    VCard_Image: vcard7,
    VCard_Link: "https://myvirtualcard.in/Doctor_Preview",
  },

  {
    Id: 8,
    TemplateCount: 8,
    VCard_Name: "CAB DRIVER",
    VCard_Image: vcard8,
    VCard_Link: "https://myvirtualcard.in/Cab_Drivers_Preview",
  },
  {
    Id: 9,
    TemplateCount: 9,
    VCard_Name: "ADVOCATE OFFICER",
    VCard_Image: vcard9,
    VCard_Link: "https://myvirtualcard.in/Advocate_Preview",
  },
  {
    Id: 10,
    TemplateCount: 10,
    VCard_Name: "EDUCATION INSTITUTE",
    VCard_Image: vcard10,
    VCard_Link: "https://myvirtualcard.in/Education_Preview",
  },
];

//..............................................................
//Session-3

import Session3PriceAnime from '../../../assets/Lotte_Animation/Price1.json';
import Session3BackImage from '../../../assets/Lotte_Animation/Back_Anime1.json';
import Session3Arrow from '../../../assets/Lotte_Animation/Arrow3.json';
import Session3Robo from '../../../assets/Lotte_Animation/Robot-10.json';
import Session3arrowAnime from '../../../assets/Lotte_Animation/Arrow2.json'
export const Session3PriceOption = {
  loop: true,
  autoplay: true,
  animationData: Session3PriceAnime,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session3BackImageOption = {
  loop: true,
  autoplay: true,
  animationData: Session3BackImage,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session3ArrowOption = {
  loop: true,
  autoplay: true,
  animationData: Session3Arrow,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session3LeftRobo = {
  loop: true,
  autoplay: true,
  animationData: Session3Robo,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const Session3ArrowOption2 = {
  loop: true,
  autoplay: true,
  animationData: Session3arrowAnime,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
  //PLan list
  export let free_plan_service_list = [
    {
      id: 0,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Demo Purpose Single Static Vcard Template.",
    },
    {
      id: 1,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Basic Information about Your Company.",
    },
    {
      id: 2,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your social media link by one click. ",
    },
    {
      id: 3,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your Contact Details. ",
    },
    {
      id: 4,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Share your products and services with restrictions.",
    },
    {
      id: 5,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Appoinment shedule by one click. ",
    },
    {
      id: 7,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add to Contact Button.",
    },
    {
      id: 9,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Post your images by gallery. ",
    },
    {
      id: 10,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Client review's by Testimonial view.",
    },
    {
      id: 11,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Upload Your Service Video max 2 .",
    },
    {
      id: 12,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "User Feedback and Inquiry Form.",
    },

  ];
 export let static_plan_service_list = [
    {
      id: 0,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Wide Range Of Static VCard Template's.",
    },
    {
      id: 1,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Basic Information about Your Company.",
    },
    {
      id: 2,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your social media link by one click. ",
    },
    {
      id: 3,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your Contact Details. ",
    },
    {
      id: 4,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Share all your  products and services.",
    },
    {
      id: 5,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Appoinment shedule by one click. ",
    },
    {
      id: 7,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add to Contact Button.",
    },
    {
      id: 9,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Post your images by gallery. ",
    },
    {
      id: 10,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Client review's by Testimonial view.",
    },
    {
      id: 11,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Upload Your Product Video .",
    },
    {
      id: 12,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "User Feedback and Inquiry Form.",
    },

  ];
 export let dynamic_plan_service_list = [
    {
      id: 0,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Dynamic VCard Template Design.",
    },
    {
      id: 1,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Basic Information about Your Company.",
    },
    {
      id: 2,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your social media link by one click. ",
    },
    {
      id: 3,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your Contact Details. ",
    },
    {
      id: 4,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Share all your  products and services.",
    },
    {
      id: 5,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Appoinment shedule by one click. ",
    },
    {
      id: 7,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add to Contact Button.",
    },
    {
      id: 9,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Post your images by gallery. ",
    },
    {
      id: 10,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Client review's by Testimonial view.",
    },
    {
      id: 11,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Upload Your Video's.",
    },
    {
      id: 12,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "User Feedback and Inquiry Form.",
    },
    {
      id: 13,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Dynamic Styling change your Vcard Design.",
    },
    {
      id: 14,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "QRCode Scan and Share your Website.",
    },
  ];

  //....................................................
  // Session-5
  import FeatureIcon from '../../../assets/Lotte_Animation/Mobile2.json';
  import Call from '../../../assets/Lotte_Animation/Call.json';
  import Share from '../../../assets/Lotte_Animation/Share.json';
  import Scan from '../../../assets/Lotte_Animation/Scan.json';
  import SocialMedia from '../../../assets/Lotte_Animation/SocialMedias.json';
  import Template from '../../../assets/Lotte_Animation/Template.json';
  import Price from '../../../assets/Lotte_Animation/Price.json';
  import update from '../../../assets/Lotte_Animation/Update.json';
  import Ratting from '../../../assets/Lotte_Animation/Star.json';
  import Enquiry from '../../../assets/Lotte_Animation/Message.json';
  import Robot from '../../../assets/Lotte_Animation/Robot-4.json'
  export const Session5Icon= {
    loop: true,
    autoplay: true,
    animationData: FeatureIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const Session5Robot= {
    loop: true,
    autoplay: true,
    animationData: Robot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const CallIcon= {
    loop: true,
    autoplay: true,
    animationData: Call,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const ShareIcon= {
    loop: true,
    autoplay: true,
    animationData: Share,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const ScanIcon= {
    loop: true,
    autoplay: true,
    animationData: Scan,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const SocialMediaIcon= {
    loop: true,
    autoplay: true,
    animationData: SocialMedia,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const TemplateIcon= {
    loop: true,
    autoplay: true,
    animationData: Template,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const PriceIcon= {
    loop: true,
    autoplay: true,
    animationData: Price,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const UpdateIcon= {
    loop: true,
    autoplay: true,
    animationData: update,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const StarIcon= {
    loop: true,
    autoplay: true,
    animationData: Ratting,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const EnquiryIcon= {
    loop: true,
    autoplay: true,
    animationData: Enquiry,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export let Feature_list = [
    {
      id: 1,
      icon: <i className='bx bx-phone-call'></i>,
      title:"Click to Call Feature",
      content: "Connect Effortlessly - Your Clients Reach You with Just a Tap!",
    },
    {
      id: 2,
      icon: <i className='bx bx-share-alt' ></i>,
      title:"Share Your vCard Seamlessly",
      content: "Effortlessly ShareYour Business Information via SMS, Email, and More.",
    },
    {
      id: 3,
      icon: <i className='bx bx-qr-scan' ></i>,
      title:"Scan and Share Your vCard",
      content: "Scan to Access, Share to Connect: Simplify Networking with QR Codes",
    },
    {
      id: 4,
      icon: <i className='bx bxl-whatsapp' ></i>,
      title:"Social Media Links",
      content: "Your clients can connect with you on social media, and sharing your social link can also increase your business.",
    }
  ];
  export let Feature_list2 = [
   
    {
      id: 1,
      icon: <i className='bx bx-notepad'></i>,
      title:"Wide Range of Templates",
      content: "You can choose from a wide range of templates for your VCards and share them with your clients.",
    },
    {
      id: 2,
      icon: <i className='bx bx-purchase-tag' ></i>,
      title:"Afforadable Pricing",
      content: "We offer a variety of pricing plans for you to choose from, depending on your needs.",
    },
    {
      id: 3,
      icon: <i className='bx bx-cloud-upload'></i>,
      title:"Easy To Update",
      content: "You can update your details as and when you want to change unlimited times.",
    },
    {
      id: 4,
      icon:<i className='bx bx-slideshow' ></i>,
      title:"Review & Ratting",
      content: "Anyone can give feedback about your organization and rate out of 5 stars and others can see on the cards.",
    },
    {
      id: 5,
      icon: <i className='bx bx-notepad' ></i>,
      title:"Enquiry Form",
      content: "Our Card can help to capture leads with enquiry form. You will Chekout your dashboard notification for each enquiry.",
    },
  ];
  //.........................................
  //session6
  import nfcbackImage from '../../../assets/Lotte_Animation/Back_Anime4.json';
  export const nfcBack= {
    loop: true,
    autoplay: true,
    animationData: nfcbackImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //.......................................

  //Session7

  import ServiceBackAnime from '../../../assets/Lotte_Animation/Gradient_Back6.json';
  import ServiceRobotAnime from '../../../assets/Lotte_Animation/Service-1.json';
  import Service1 from '../../../assets/Lotte_Animation/Service.json'
  import Service2 from '../../../assets/Lotte_Animation/Backend.json'
  import Service3 from '../../../assets/Lotte_Animation/Service-3.json'
  import Service4 from '../../../assets/Lotte_Animation/Service-2.json'
  export const ServiceBack= {
    loop: true,
    autoplay: true,
    animationData: ServiceBackAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const ServiceRobot= {
    loop: true,
    autoplay: true,
    animationData: ServiceRobotAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const Service1Image= {
    loop: true,
    autoplay: true,
    animationData: Service1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const Service2Image= {
    loop: true,
    autoplay: true,
    animationData: Service2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const Service3Image= {
    loop: true,
    autoplay: true,
    animationData: Service3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export const Service4Image= {
    loop: true,
    autoplay: true,
    animationData: Service4,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  export let Service_list = [
    {
      id: 1,
      icon: Service1Image,
      title:"Web Design & Development",
      content: "We help you build an intercative & mobile responsive webiste for your business. it helps to get more visitors and promotes your business 24/7.",
    },
    {
      id: 2,
      icon: Service2Image,
      title:"Backend Application With Authenitications",
      content: "We help you build an secure data Collection & mobile responsive webiste for your business. it helps to get more visitors and promotes your business 24/7.",
    },
    {
      id: 3,
      icon: Service3Image,
      title:"Digital VCard Application",
      content: "Our digital visiting card helpes to share your business products and details with your customers and business friends. Pricing starts from ₹599",
    },
    {
      id: 4,
      icon: Service4Image,
      title:"Digital Marketting",
      content: "Digital marketing, also called online marketing, is the promotion of brands to connect with potential customers using the internet and other forms of digital communication. This includes not only email, social media, and web-based advertising.",
    },
    
  ];

  //.................................
  //FAQ



  export let questions = [
    {
      id: 1,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "1. What is a digital vCard?",
      answer:
        "A digital vCard, or virtual business card, is a modern alternative to traditional paper business cards. It contains essential contact information such as name, job title, company name, phone number, email address, and more, all stored in a digital format.",
    },
    {
      id: 2,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "2. How does the NFC feature work with digital vCards?",
      answer:
        "The NFC (Near Field Communication) feature allows you to share your digital vCard with others by simply tapping your NFC-enabled device against theirs. This instantaneously transfers your contact information without the need for manual input or scanning QR codes.",
    },
    {
      id: 3,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "3. What devices are compatible with the NFC feature?",
      answer:
        "Most modern smartphones and tablets are equipped with NFC technology, including Android and iOS devices. Ensure that your device’s NFC functionality is enabled to take advantage of this feature.",
    },
    {
      id: 4,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "4. Can I customize my digital vCard?",
      answer:
        "Yes, you can customize your digital vCard with your preferred design, including adding your company logo, choosing colors, and selecting fonts. You can also include additional information such as social media profiles and website links.",
    },
    {
      id: 5,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "5. Is there a limit to the number of vCards I can create?",
      answer:
        "No, there are no limits to the number of digital vCards you can create. You can generate multiple vCards for different purposes, such as personal, professional, or specific events.",
    },
    {
      id: 6,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "6. How do I share my digital vCard with others?",
      answer: `You can share your digital vCard in multiple ways:
      •Via NFC: Simply tap your device against another NFC-enabled device to transfer your vCard.
      •QR Code: Display a QR code containing your vCard information for others to scan.
      •Email: Send your digital vCard as an email attachment.
      •Messaging Apps: Share your vCard through messaging apps like WhatsApp or Telegram.`,
    },
    {
      id: 7,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "7. Can I update my digital vCard after creation?",
      answer:
        "Yes, you can update your digital vCard at any time. Changes you make to your contact information or design preferences will be reflected in the shared vCards.",
    },
    {
      id: 8,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question:
        "8. Is there a fee for using the NFC-enabled digital vCard service?",
      answer:
        "Our basic NFC-enabled digital vCard service is free to use. However, we may offer premium features or advanced customization options that come with a subscription fee.",
    },
    {
      id: 9,
      plus: <i className="bx bx-plus"></i>,
      minus: <i className="bx bx-minus"></i>,
      question: "9. Is the NFC transfer secure?",
      answer:
        "Yes, the NFC transfer of digital vCards is secure and encrypted, ensuring that your contact information remains protected during the sharing process.",
    },
    // {
    //   id: 10,
    //   plus: <i className="bx bx-plus"></i>,
    //   minus: <i className="bx bx-minus"></i>,
    //   question:
    //     "10. What if I encounter issues with NFC sharing or using digital vCards?",
    //   answer:
    //     "If you experience any difficulties with NFC sharing or using digital vCards, please refer to our comprehensive user guide or contact our customer support team for assistance. We’re here to help resolve any issues you may encounter.",
    // },
  ];