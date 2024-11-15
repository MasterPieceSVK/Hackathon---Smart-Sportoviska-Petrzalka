"use client";

import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation

export default function SearchSportovisko() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (input: string) => {
    setValue(input);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      router.push(`/sportoviska?q=${encodeURIComponent(input)}`);
    }, 200);
  };

  return (
    <div>
      <Input
        placeholder="Vyhladat sportovisko"
        onChange={(e) => handleInputChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
