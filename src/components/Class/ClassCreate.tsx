import { useNavigate } from "react-router";
import BreadcrumbComponent from "../ui/BreadcrumbsComponent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sheet, SheetContent } from "../ui/sheet";
import ClassCreateForm from "./ClassCreateForm";
import { useState } from "react";

function ClassCreate() {
  const navigate = useNavigate();
  const [open, setOpen]= useState(true)
  const breadcrumbLinks = [
    { label: "Dashboard", href: "/" },
    { label: "All Classes", href: "/class" },
    { label: "Add New Class", href: "#" },
  ];

  // handleSheetChange
  const handleSheetChange = (open: boolean) => {
    if (!open) {
      setOpen(!open)
      navigate(-1);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetChange}>
      <SheetContent size="lg">
        <BreadcrumbComponent links={breadcrumbLinks} />
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                Create New Class
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 text-sm">
              <ClassCreateForm />
            </CardContent>
          </Card>
        </main>
      </SheetContent>
    </Sheet>
  );
}

export default ClassCreate;
