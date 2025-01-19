'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ value }: { value: string }) {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => setIsCopy(true))
      .catch(() => setIsCopy(false))
      .finally(() => setTimeout(() => setIsCopy(false), 2000));
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleCopy}
    >
      {
        isCopy
          ? <Check />
          : <Copy />
      }
    </Button>
  );
}
