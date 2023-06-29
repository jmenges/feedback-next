import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

import { features } from "@/config.js";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import IconNewFeedback from "@/../public/icons/icon-new-feedback.svg";
import { IFeedbackPartial } from "@/types";

type Props = {
  Icon: React.ElementType;
  title: string;
  buttons: React.ElementType[];
  feedback?: IFeedbackPartial; // used with edit form
};

export default function FeedbackForm({ Icon, title, buttons }: Props) {
  return (
    <Card className="relative space-y-6 pt-12 text-xs">
      <i className="l-10 absolute top-0 -translate-y-1/2 w-14 h-14 object-contain flex">
        <Icon className="" />
      </i>
      <h2 className="">{title}</h2>
      {/* Feedback title */}
      <fieldset className="">
        <label
          className="mb-2 text-h4 font-bold text-darker-blue"
          htmlFor="title"
        >
          Feedback Title
        </label>
        <p className="mb-4">Add a short, descriptive headline</p>
        <Input />
      </fieldset>
      {/* Category Selector */}
      <fieldset className="">
        <label
          className="mb-2 text-h4 font-bold text-darker-blue"
          htmlFor="title"
        >
          Category
        </label>
        <p className="mb-4">Choose a category for your feedback</p>
        <Select defaultValue="feature">
          <SelectTrigger className="">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {features.map((feature) => (
              <SelectItem value={feature.toLowerCase()}>{feature}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
      {/* Detail Textarea */}
      <fieldset className="">
        <label
          className="mb-2 text-h4 font-bold text-darker-blue"
          htmlFor="title"
        >
          Feedback Detail
        </label>
        <p className="mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <Textarea />
      </fieldset>
      {/* Form actions */}
      <div className="!mt-10 space-y-4">
        {buttons.map((Button, index) => (
          <Button key={index} />
        ))}
      </div>
    </Card>
  );
}
