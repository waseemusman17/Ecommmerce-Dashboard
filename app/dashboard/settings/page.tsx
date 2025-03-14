"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="My eCommerce Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Email Address</Label>
                <Input id="store-email" type="email" defaultValue="contact@mystore.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Phone Number</Label>
                <Input id="store-phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Address</Label>
                <Textarea
                  id="store-address"
                  defaultValue="123 Main St, Suite 101&#10;New York, NY 10001&#10;United States"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-currency">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="store-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure the payment methods available to your customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="stripe">Stripe</Label>
                  <span className="text-sm text-muted-foreground">Accept credit card payments via Stripe</span>
                </div>
                <Switch id="stripe" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="paypal">PayPal</Label>
                  <span className="text-sm text-muted-foreground">Accept payments via PayPal</span>
                </div>
                <Switch id="paypal" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="bank-transfer">Bank Transfer</Label>
                  <span className="text-sm text-muted-foreground">Accept direct bank transfers</span>
                </div>
                <Switch id="bank-transfer" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="cash-on-delivery">Cash on Delivery</Label>
                  <span className="text-sm text-muted-foreground">Accept cash payments upon delivery</span>
                </div>
                <Switch id="cash-on-delivery" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
              <CardDescription>Configure shipping methods and rates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="free-shipping">Free Shipping</Label>
                  <span className="text-sm text-muted-foreground">Offer free shipping on all orders</span>
                </div>
                <Switch id="free-shipping" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
                <Input id="free-shipping-threshold" type="number" defaultValue="50" />
                <span className="text-sm text-muted-foreground">
                  Orders above this amount qualify for free shipping
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flat-rate">Flat Rate Shipping ($)</Label>
                <Input id="flat-rate" type="number" defaultValue="5.99" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="local-pickup">Local Pickup</Label>
                  <span className="text-sm text-muted-foreground">Allow customers to pick up orders in person</span>
                </div>
                <Switch id="local-pickup" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="order-notifications">Order Notifications</Label>
                  <span className="text-sm text-muted-foreground">Receive notifications for new orders</span>
                </div>
                <Switch id="order-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="customer-notifications">Customer Notifications</Label>
                  <span className="text-sm text-muted-foreground">
                    Receive notifications for new customer registrations
                  </span>
                </div>
                <Switch id="customer-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="inventory-notifications">Inventory Alerts</Label>
                  <span className="text-sm text-muted-foreground">Receive notifications for low stock items</span>
                </div>
                <Switch id="inventory-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <span className="text-sm text-muted-foreground">Send promotional emails to customers</span>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

