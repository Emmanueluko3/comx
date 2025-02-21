import { IMAGES, PAGES } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  redirect?: string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ redirect, className }) => {
  return (
    <Link href={redirect || PAGES.home}>
      <Image
        src={IMAGES.logo}
        alt=""
        width={500}
        height={500}
        className={`h-20 w-40 ${className}`}
      />
    </Link>
  );
};

export default Logo;
