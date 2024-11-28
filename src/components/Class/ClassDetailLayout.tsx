interface ClassDetailLayoutProps {
  children?: React.ReactNode;
  performance?: React.ReactNode;
  enrollments?: React.ReactNode;
}

export const ClassDetailLayout = ({ children, performance, enrollments }: ClassDetailLayoutProps) => {
  return (
    <div className="grid h-full col-span-1 overflow-hidden md:grid-cols-2 lg:grid-cols-12">
      <div className="border-l lg:col-span-3">
        <div className="overflow-hidden bg-white border ">
        {performance}
        </div>
      </div>
      <div className="border-r lg:col-span-6">
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
      <div className="overflow-hidden border-r md:col-span-2 lg:col-span-3">
        {enrollments}
      </div>
    </div>
  );
};

