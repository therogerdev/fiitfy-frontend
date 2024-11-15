import { cn } from "@/lib/utils";

const ContentLayout = ({
  header,
  children,
  className,
  breadcrumbs,
}: {
  header?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(className, "p-4 sm:px-10 sm:py-0 md:gap-8 lg:py-6 ")}
    >
      {breadcrumbs && <>{breadcrumbs}</>}
      {header && (
        <div className="flex justify-end">
          <div className="flex justify-end w-full max-w-6xl px-8 py-3 mxl-auto">
            {header}
          </div>
        </div>
      )}
      {children}
    </section>
  );
};

export default ContentLayout;
