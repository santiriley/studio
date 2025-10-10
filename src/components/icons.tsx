import type { SVGProps } from 'react';
import { Telescope } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center h-8 w-8 bg-primary rounded-md text-primary-foreground">
        <Telescope {...props} className="h-5 w-5" />
    </div>
  );
}
