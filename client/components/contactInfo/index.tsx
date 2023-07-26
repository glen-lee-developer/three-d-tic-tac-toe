import { BsGithub, BsLinkedin } from "react-icons/bs";

const ContactInfo = () => {
  return (
    <div className="text-white flex justify-center items-center gap-2 ">
      <p className="">Glen Lee</p>

      <a target="_blank" href="https://www.linkedin.com/in/glen-lee-developer/">
        <BsLinkedin className="h-5 w-5 hover:text-blue-600" />
      </a>
      <a target="_blank" href="https://github.com/glen-lee-developer">
        <BsGithub className="h-5 w-5 hover:text-green-600" />
      </a>
    </div>
  );
};

export default ContactInfo;
