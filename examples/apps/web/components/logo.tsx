import Image from "next/image";

export const Logo = ({
  ...rest
}: {
  alt: string;
  src: string;
  width: number;
  height: number;
}) => {
  return <Image {...rest} />;
};
