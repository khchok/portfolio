import { CiMail } from "react-icons/ci";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const getSocialLinks = () => {
  const socialLinks = [
    {
      link: "https://github.com/khchok",
      icon: FaGithub,
      label: "github.com/khchok",
    },
    {
      link: "https://www.linkedin.com/in/khar-hui-chok-96a852203",
      icon: FaLinkedin,
      label: "LinkedIn Profile",
    },
    {
      link: "mailto:chok072056@gmail.com",
      icon: CiMail,
      label: "chok072056@gmail.com",
    },
    {
      link: "https://wa.me/60182586282",
      icon: FaWhatsapp,
      label: "+60 18258 6282",
    },
  ];
  return socialLinks;
};
