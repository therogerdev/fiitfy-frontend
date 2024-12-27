import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HouseIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbLink {
  label: string;
  href?: string;
}

interface BreadcrumbComponentProps {
  links: BreadcrumbLink[];
}

const BreadcrumbComponent = ({ links }: BreadcrumbComponentProps) => (
  <Breadcrumb className='hidden my-2 md:flex'>
    <BreadcrumbList>
      <BreadcrumbLink asChild>
        <Link to={'/'}>
          {<HouseIcon className='w-4 h-4' />}
        </Link>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {link.href ? (
              <BreadcrumbLink asChild>
                <Link to={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{link.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {/* Render BreadcrumbSeparator only between items, not after the last item */}
          {index < links.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);

export default BreadcrumbComponent;
