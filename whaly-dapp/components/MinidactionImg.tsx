import { minidenticon } from "minidenticons";
import Image from "next/image";
import { useMemo } from "react";

type Minidenticon = {
  symbol: string;
  saturation: number;
  lightness: number;
  width: number;
  height: number;
};

const MinidenticonImg: React.FC<Minidenticon> = ({
  symbol,
  saturation,
  lightness,
  width,
  height,
}) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(symbol, saturation, lightness)),
    [symbol, saturation, lightness]
  );
  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      <Image src={svgURI} alt={symbol} width={width} height={height} />
    </div>
  );
};

export default MinidenticonImg;
