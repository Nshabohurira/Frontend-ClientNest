
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, Check, X } from "lucide-react";

const BillingPage = () => {
  const currentPlan = {
    name: "Professional",
    price: 49,
    billing: "monthly",
    features: [
      "Up to 10 social accounts",
      "Unlimited posts",
      "Advanced analytics",
      "Team collaboration (5 members)",
      "Priority support",
    ],
  };

  const plans = [
    {
      name: "Starter",
      price: 19,
      billing: "monthly",
      features: [
        "Up to 3 social accounts",
        "50 posts per month",
        "Basic analytics",
        "1 team member",
        "Email support",
      ],
      current: false,
    },
    {
      name: "Professional",
      price: 49,
      billing: "monthly",
      features: [
        "Up to 10 social accounts",
        "Unlimited posts",
        "Advanced analytics",
        "Team collaboration (5 members)",
        "Priority support",
      ],
      current: true,
    },
    {
      name: "Enterprise",
      price: 99,
      billing: "monthly",
      features: [
        "Unlimited social accounts",
        "Unlimited posts",
        "Custom analytics",
        "Unlimited team members",
        "24/7 phone support",
        "Custom integrations",
      ],
      current: false,
    },
  ];

  const invoices = [
    {
      id: "INV-001",
      date: "2024-01-01",
      amount: 49,
      status: "paid",
      description: "Professional Plan - January 2024",
    },
    {
      id: "INV-002",
      date: "2023-12-01",
      amount: 49,
      status: "paid",
      description: "Professional Plan - December 2023",
    },
    {
      id: "INV-003",
      date: "2023-11-01",
      amount: 49,
      status: "paid",
      description: "Professional Plan - November 2023",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <Badge>Current</Badge>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                ${currentPlan.price}
                <span className="text-base font-normal text-muted-foreground">
                  /{currentPlan.billing}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Next billing date: February 1, 2024
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Change Plan
              </Button>
              <Button variant="outline">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline">
              Update Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-6 ${
                  plan.current ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    ${plan.price}
                    <span className="text-base font-normal text-muted-foreground">
                      /{plan.billing}
                    </span>
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="w-full"
                  variant={plan.current ? "secondary" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Choose Plan"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Billing History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()} • {invoice.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <Badge
                      className={
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
