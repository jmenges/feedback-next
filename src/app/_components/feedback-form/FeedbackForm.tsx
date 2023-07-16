import Card from "@/app/_components/Card";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import React from "react";

import { Textarea } from "@/app/_components/ui/textarea";

import FormFieldGroup from "@/app/_components/feedback-form/FormFieldGroup";
import { categories } from "@/data/categories";
import { FeedbackAdd } from "@/types/feedbacks";
import { Feedback } from "@prisma/client";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useForm,
} from "react-hook-form";

type Props = {
  Icon: React.ElementType;
  title: string;
  AdditionalFormFieldGroups?: React.ElementType<{
    register: UseFormRegister<FeedbackAdd | Feedback>;
    control: Control<FeedbackAdd | Feedback>;
    errors: FieldErrors<FeedbackAdd | Feedback>;
  }>;
  Actions: React.ElementType;
  onSubmit: (data: FeedbackAdd | Feedback) => Promise<void>;
  feedback?: Feedback; // used with edit form
};

export default function FeedbackForm({
  Icon,
  title,
  AdditionalFormFieldGroups,
  Actions,
  feedback,
  onSubmit,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackAdd | Feedback>({
    values: feedback,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });
  const onFormSubmit = (data: FeedbackAdd | Feedback) => {
    onSubmit(data);
    // console.log(data);
  };

  return (
    <Card className="relative text-xs">
      <i className="l-10 absolute top-0 flex h-14 w-14 -translate-y-1/2 object-contain">
        <Icon className="" />
      </i>
      <form className="space-y-6 pt-8" onSubmit={handleSubmit(onFormSubmit)}>
        <h2 className="">{title}</h2>

        {/* Feedback title */}
        <FormFieldGroup
          fieldName="title"
          title="Feedback Title"
          description="Add a short, descriptive headline"
          errorMsg={errors?.title?.message?.toString()}
        >
          <Input
            {...register("title", { required: "Can’t be empty." })}
            aria-invalid={errors?.title !== undefined}
          />
        </FormFieldGroup>

        {/* Category selector */}
        <FormFieldGroup
          fieldName="category"
          title="Category"
          description="Choose a category for your feedback"
          errorMsg={errors?.category?.message?.toString()}
        >
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
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormFieldGroup>

        {!!AdditionalFormFieldGroups && (
          <AdditionalFormFieldGroups
            register={register}
            errors={errors}
            control={control}
          />
        )}

        {/* Detail textarea */}
        <FormFieldGroup
          fieldName="description"
          title="Feedback Detail"
          description="Include any specific comments on what should be improved, added,
          etc."
          errorMsg={errors?.description?.message?.toString()}
        >
          <Textarea
            {...register("description", { required: "Can’t be empty." })}
            aria-invalid={errors?.description !== undefined}
          />
        </FormFieldGroup>

        {/* Form actions */}
        <div className="!mt-10 space-y-4">
          <Actions />
        </div>
      </form>
    </Card>
  );
}
