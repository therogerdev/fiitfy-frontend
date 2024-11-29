import ContentLayout from '@/components/layouts/content-layout';
import BreadcrumbComponent from '@/components/ui/BreadcrumbsComponent';
import { appLink } from '@/config/links';

const breadcrumbLinks = [appLink.workout];

const WorkoutPage = () => {
  return (
    <ContentLayout className=''>
    <BreadcrumbComponent links={breadcrumbLinks} />
   Workouts
  </ContentLayout>
  )
}

export default WorkoutPage