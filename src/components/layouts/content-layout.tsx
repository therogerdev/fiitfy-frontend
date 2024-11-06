import { cn } from '@/lib/utils';

const ContentLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        className,
        '  p-4 sm:px-10 sm:py-0 md:gap-8 lg:py-6'
      )}
    >
      {children}
    </section>
  );
};

export default ContentLayout;
