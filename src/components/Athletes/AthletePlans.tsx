import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { EndpointType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useLocation } from "react-router";

const packages = [
  {
    name: "Unlimited Plus",
    price: "£79.00/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Premium access for full recovery and training experience.",
    features: [
      "Unlimited access to all Hybrid Training programs",
      "Unlimited access to Hybrid Reformer",
      "Unlimited access to communal Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "3x sessions of private sauna & ice baths weekly",
      "6 month minimum term",
    ],
    mostPopular: true,
  },
  {
    name: "Unlimited Training + Reformer",
    price: "£75.00/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Comprehensive training and recovery access.",
    features: [
      "Unlimited access to all Hybrid Training programs",
      "Unlimited access to Hybrid Reformer",
      "Unlimited access to communal Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "6 month minimum term",
    ],
    mostPopular: false,
  },
  {
    name: "Unlimited Recovery",
    price: "£54.99/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Focused on recovery and relaxation.",
    features: [
      "Unlimited access to Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "3x sessions of private sauna & ice baths weekly",
      "3 month minimum term",
    ],
    mostPopular: false,
  },
  {
    name: "Unlimited Reformer",
    price: "£62.99/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Perfect for those focused on reformer training.",
    features: [
      "Unlimited access to Hybrid Reformer",
      "Unlimited access to communal Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "3 month minimum term",
    ],
    mostPopular: false,
  },
  {
    name: "Training 'Off Peak'",
    price: "£54.99/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Training access outside peak hours.",
    features: [
      "Unlimited access to all Hybrid Training programs",
      "Unlimited access to communal Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "6 month minimum term",
      "* Excludes access to 6am and 5:30pm classes",
    ],
    mostPopular: false,
  },
  {
    name: "Training 'Peak'",
    price: "£62.99/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "All-day access to training programs.",
    features: [
      "Unlimited access to all Hybrid Training programs",
      "Unlimited access to communal Ice Baths",
      "Unlimited use of Normatec Recovery Boots",
      "6 month minimum term",
    ],
    mostPopular: false,
  },
  {
    name: "2 Classes Per Week",
    price: "£52.99/week",
    priceId: "price_1QCK7hJeM6E16zS470pgSmGZ",
    description: "Flexible plan for limited training access.",
    features: [
      "Unlimited access to 2x Hybrid Training programs or Reformer classes weekly",
      "3 month minimum term",
    ],
    mostPopular: false,
  },
];

const casualConcessions = [
  {
    name: "Casual Drop In",
    price: "£28.99",
    description: "Access all Hybrid Training Programs or Reformer Classes.",
  },
  {
    name: "Casual 1 Hour Private Sauna",
    price: "£35.00",
    description:
      "Relax and unwind in one of our private saunas (2 person max).",
  },
  {
    name: "10 Class Concession Pack",
    price: "£260.00",
    description:
      "Unlimited access to all Hybrid Training programs or Reformer classes.",
  },
];

const getCheckoutSession = async (priceId: string, customerEmail: string) => {
  const response = await apiClient.post(EndpointType.Checkout, {
    priceId,
    customerEmail,
  });
  return response.data;
};

export default function MembershipPlans() {
  const { toast } = useToast();
  const location = useLocation();
  const { customerEmail } = location.state || {};

  const handleBuy = (packageName: string) => {
    alert(`You selected the ${packageName} package.`);
    // Add your buy package logic here
  };

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
    <div className="py-24 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Membership Packages
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Flexible Plans for Training & Recovery
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
            Choose a plan that fits your fitness goals and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`${
                pkg.mostPopular
                  ? "ring-2 ring-foreground"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`${
                    pkg.mostPopular ? " text-primary-foreground" : ""
                  }`}
                >
                  {pkg.name}
                </CardTitle>
                {pkg.mostPopular && (
                  <Badge
                    variant="outline"
                    className=" text-primary-foreground bg-primary"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        aria-hidden="true"
                        className="flex-none w-5 h-6 text-primary-foreground"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6"
                  onClick={() => handleCheckout(pkg.priceId)}
                >
                  Buy Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            Casual & Concessions
          </h3>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {casualConcessions.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{item.price}</p>
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={() => handleBuy(item.name)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
