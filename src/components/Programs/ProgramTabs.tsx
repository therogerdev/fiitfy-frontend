import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProgramActions from './ProgramActions';
import ProgramList from './ProgramList';

const ProgramTabs = () => (
  <Tabs defaultValue="all">
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived" className="hidden sm:flex">Archived</TabsTrigger>
      </TabsList>
      <ProgramActions />
    </div>
    <TabsContent value="all">
      <Card>
        <CardHeader>
          <CardTitle>Programs</CardTitle>
          <CardDescription>Manage your programs and view their performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramList />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            {/* TODO: fix the total programs */}
            Showing <strong>1-10</strong> of <strong>32</strong> programs
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value='active'>
        Active programs will be displayed here.
    </TabsContent>
  </Tabs>
);

export default ProgramTabs;
