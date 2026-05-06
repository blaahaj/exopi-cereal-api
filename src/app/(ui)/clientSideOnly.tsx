// Because sometimes, it seems that "use client" isn't enough. Sigh.

import { type PropsWithChildren, useEffect, useState } from "react";

export default function ClientSideOnly({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => void setTimeout(() => setIsClient(true), 1), []);

  return <>{isClient && children}</>;
}
