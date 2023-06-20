import Image from "next/image";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const LoginWithSocial = () => {
  return (
    <>
    <div className="grid gap-3">
      {loginSocials.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
        >
          <Image
            className="flex-shrink-0"
            src={item.icon}
            alt={item.name}
            sizes="40px"
          />
          <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {item.name}
          </h3>
        </a>
      ))}
    </div>

    {/* OR */}
    <div className="relative text-center">
      <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
        OR
      </span>
      <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
    </div>
    {/* FORM */}
    </>
  );
};

export default LoginWithSocial;