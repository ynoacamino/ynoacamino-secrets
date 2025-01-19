'use client';

import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function SecretHandle({ secret }: { secret: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const defaultSecret = '•••••••••••••••••••••••';

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
    setTimeout(() => setIsVisible(false), 4000);
  };

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleVisible}
      >
        {
          isVisible
            ? <Eye />
            : <EyeOff />
        }
      </Button>
      <span className="w-32 overflow-x-hidden text-sm overflow-ellipsis whitespace-nowrap">
        {
          isVisible
            ? secret
            : defaultSecret
        }
      </span>
    </>
  );
}
