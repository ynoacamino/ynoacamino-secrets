import { CopyButton } from '@/components/ui/copyButton';
import { SecretHandle } from '@/components/ui/secretHandle';

export default function SecretValueOptions({ secretValue }: { secretValue: string }) {
  return (
    <div className="flex items-center gap-2">
      <CopyButton value={secretValue} />
      <SecretHandle secret={secretValue} />
    </div>
  );
}
