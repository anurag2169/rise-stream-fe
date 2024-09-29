import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ContainerIcon,
  GearIcon,
  HomeIcon,
  IconJarLogoIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export const simpleTestTabData = [
  {
    value: "home",
    label: "Home",
    Icon: HomeIcon,
    isVisible: true,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Home</h2>
        <p className="text-muted-foreground">
          This is a simple content area for testing purposes.
        </p>
        <Button>Click me!</Button>
      </div>
    ),
  },
  {
    value: "about",
    label: "About",
    Icon: PersonIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">About Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    value: "formExample",
    label: "Form Example",
    Icon: ListBulletIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Form Example</h2>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <Button>Submit</Button>
      </div>
    ),
  },
  {
    value: "setting",
    label: "Setting",
    Icon: GearIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Setting Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    value: "help",
    label: "Help",
    Icon: IconJarLogoIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Help Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    value: "contactUs",
    label: "Contact Us",
    Icon: ContainerIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Contact Us Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    value: "faqs",
    label: "Faqs",
    Icon: HomeIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Faqs Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    value: "pricing",
    label: "Pricing",
    Icon: HomeIcon,
    content: (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Pricing Content</h2>
        <ul className="list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
];
