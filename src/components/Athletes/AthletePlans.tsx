import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { EndpointType } from "@/types/api";
import { useLocation } from "react-router";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";

const plans = [
  {
    name: "VIP Premium Membership",
    description: "All-inclusive access with premium benefits",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    price: "$99/month",
  },
  {
    name: "Gold Membership",
    description: "Extended access with added benefits",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    price: "$69/month",
  },
  {
    name: "Silver Membership",
    description: "Basic access to facilities",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    price: "$49/month",
  },
];

const getCheckoutSession = async (priceId: string, customerEmail: string) => {
  const response = await apiClient.post(EndpointType.Checkout, {
    priceId,
    customerEmail,
  });
  return response.data; 
};

const AthletePlans = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { customerEmail } = location.state || {};

  const createCheckoutSessionMutation = useMutation({
    mutationFn: (variables: { priceId: string; customerEmail: string }) =>
      getCheckoutSession(variables.priceId, variables.customerEmail),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = (priceId: string) => {
    if (!customerEmail) {
      toast({
        title: "Missing Customer Email",
        description: "Please provide a valid customer email.",
        variant: "destructive",
      });
      return;
    }
    createCheckoutSessionMutation.mutate({ priceId, customerEmail });
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Membership Plans</DialogTitle>
          <DialogDescription>
            Choose the plan that best suits your needs.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mt-4">
          {plans.map((plan, index) => (
            <Card key={index} className="border rounded-lg shadow-sm">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                <Badge variant="secondary" className="text-md">
                  {plan.price}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardContent>
              <DialogFooter className="justify-start">
                <Button
                  variant="default"
                  className="mt-2"
                  onClick={() => handleCheckout(plan.priceId)}
                  disabled={createCheckoutSessionMutation.isPending}
                >
                  {createCheckoutSessionMutation.isPending
                    ? "Processing..."
                    : `Select ${plan.name}`}
                </Button>
              </DialogFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AthletePlans;
