'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Redireciona direto para login
export default function AppPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}
