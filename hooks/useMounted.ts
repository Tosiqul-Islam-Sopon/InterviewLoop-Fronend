import { useLayoutEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return mounted;
};

export default useMounted;
