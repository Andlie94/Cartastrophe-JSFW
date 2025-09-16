import { FaFacebook, FaInstagram, FaLinkedin  } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bottom-0 w-full p-4 text-sm text-black text-center font-light bg-[#F4F4ED]">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1">
      <p>Because one more won’t hurt… probably.</p>
      </div>
      <div className="flex justify-end gap-3 mt-3 md:mt-0">
        <a
          href="https://www.facebook.com/profile.php?id=600892412"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#C5C4A6] hover:text-[#AFAE9D] transition-colors"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/lierpool/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#C5C4A6] hover:text-[#AFAE9D] transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#C5C4A6] hover:text-[#AFAE9D] transition-colors"
        >
          <FaLinkedin />
        </a>
      </div>
      </div>
    </footer>
  );
}