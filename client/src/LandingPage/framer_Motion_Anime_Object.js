  //Animation:

import { delay } from "framer-motion";

  export let topNavAnime = {
    hide: { x: 0, opacity: 0, transition: { delay: 0.1 } },
    show: { x: 0, opacity: 1, transition: { delay: 0.1 } },
    righthide: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1},
    },
    rightshow: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  export let left_slide_1Anime = {
    hide: { x: 0, opacity: 0, transition: { staggerChildren: 0.1 } },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  export let right_slide_1Anime = {
    hide: {
      x: 0,
      opacity: 0,
      transition: { staggerChildren: 0.2 },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.2},
    },
  };
  export let title_slide_2Anime = {
    hide: {
      x: 0,
      opacity: 0,
      transition: { staggerChildren: 0.3 },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.3, delay: 0.3 },
    },
  };
  export let vcard_slide_2Anime = {
    hide: { y: 0, opacity: 0, transition: { staggerChildren: 0.2 } },
    show: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
  };
  export let title_slide_3Anime = {
    hide: {
      y: 50,
      scale: 1,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
  };
  export let box_slide_3Anime = {
    hide: { scale: 0.6, opacity: 0, transition: { staggerChildren: 0.2 } },
    show: {
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
  };
  export let title_slide_4Anime = {
    hide: {
      y: 0,
      scale: 1,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
  };
  export let left_cardShow_slide_4Anime = {
    hide: {
      x: -300,
      opacity: 0,
      transition: { staggerChildren: 0.3, type: "spring" },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.3, type: "spring", delay: 0.4 },
    },
  };
  export let right_cardShow_slide_4Anime = {
    hide: {
      x: 300,
      opacity: 0,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
  };
  export let title_slide_5Anime = {
    hide: {
      y: -100,
      scale: 1,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "spring" },
    },
  };
  export let numberBox_slide_5Anime = {
    hide: {
      rotateY: 120,
      opacity: 0,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
    show: {
      rotateY: 0,
      opacity: 1,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
  };
  export let left_nfc_slide_5Anime = {
    hide: {
      x: -220,
      opacity: 0,
      transition: { staggerChildren: 0.3, type: "spring" },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.3, type: "spring" },
    },
  };
  export let right_nfc_slide_5Anime = {
    hide: {
      y: 220,
      opacity: 0,
      transition: { staggerChildren: 0.5, type: "spring" },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.5, type: "spring", delay: 0.5 },
    },
  };
  export let plan_title_slide_6Anime = {
    hide: {
      y: -100,
      scale: 1,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "spring" },
    },
  };
  export let plan_box_slide_5Anime = {
    hide: {
      scale:0.5,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      scale:1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
  };
  export let plan_content_slide_5Anime = {
    hide: { opacity: 0, transition: { staggerChildren: 0.1, type: "smooth" } },
    show: { opacity: 1, transition: { staggerChildren: 0.1, type: "smooth" } },
  };
  export let title_slide_7Anime = {
    hide: {
      y: -100,
      scale: 1,
      opacity: 0,
      transition: { staggerChildren: 0.2, type: "smooth" },
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.2, type: "spring" },
    },
  };
  export let qn_slide_7Anime = {
    hide: {
     
   scale:1,
      opacity: 1,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
    show: {
     
     
    scale:1,
      opacity: 1,
      transition: { staggerChildren: 0.5, type: "smooth" },
    },
  };
  export let form_left_slide_8Anime = {
    hide: { opacity: 0, transition: { staggerChildren: 0.4, type: "smooth" } },
    show: { opacity: 1, transition: { staggerChildren: 0.4, type: "smooth" } },
  };