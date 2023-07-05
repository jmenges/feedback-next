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

import { Textarea } from "@/components/ui/textarea";

import { IFeedbackPartial } from "@/types";
import { features } from "@/data/features";
import { Controller, useForm } from "react-hook-form";

type Props = {
  Icon: React.ElementType;
  title: string;
  Actions: React.ElementType;
  onSubmit: (data) => void;
  feedback?: IFeedbackPartial; // used with edit form
};

export default function FeedbackForm({
  Icon,
  title,
  Actions,
  feedback,
  onSubmit,
}: Props) {
  const { control, register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Card className="relative text-xs">
      <i className="l-10 absolute top-0 flex h-14 w-14 -translate-y-1/2 object-contain">
        <Icon className="" />
      </i>
      <form className="space-y-6 pt-8" onSubmit={handleSubmit(onFormSubmit)}>
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
          <Input {...register("title")} />
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
          <Controller
            name="category"
            control={control}
            defaultValue="feature"
            render={({ field: { onChange, value, ref } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger ref={ref} className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {features.map((feature) => (
                    <SelectItem key={feature} value={feature.toLowerCase()}>
                      {feature}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
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
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <Textarea {...register("description")} />
        </fieldset>
        {/* Form actions */}
        <div className="!mt-10 space-y-4">
          <Actions />
        </div>
      </form>
    </Card>
  );
}
