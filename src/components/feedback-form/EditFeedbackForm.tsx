"use client";

import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import FormFieldGroup from "@/components/feedback-form/FormFieldGroup";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { status } from "@/data/status";
import { FeedbackAdd } from "@/types/feedbacks";
import { patchFeedbackSchema } from "@/validations/feedback";
import { Feedback } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import FeedbackForm from "./FeedbackForm";

const FeedbackActions = ({
  cancelHref,
  onDelete,
}: {
  cancelHref: string;
  onDelete: () => void;
}) => {
  return (
    <>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
      <Button className="w-full" variant="secondary" asChild>
        <Link href={cancelHref}>Cancel</Link>
      </Button>
      <Button
        type="button"
        onClick={onDelete}
        className="w-full"
        variant="destructive"
      >
        Delete
      </Button>
    </>
  );
};

type AdditionalFormFieldGroupsProps = {
  register: UseFormRegister<FeedbackAdd | Feedback>;
  control: Control<FeedbackAdd | Feedback>;
  errors: FieldErrors<FeedbackAdd | Feedback>;
};

const AdditionalFormFieldGroups = ({
  register,
  control,
  errors,
}: AdditionalFormFieldGroupsProps) => {
  return (
    <FormFieldGroup
      fieldName="status"
      title="Feedback Status"
      description="Change feature state"
    >
      <Controller
        name="status"
        control={control}
        defaultValue="suggestion"
        render={({ field: { onChange, value, ref } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger ref={ref} className="">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormFieldGroup>
  );
};

type EditFeedbackFormProps = { feedback: Feedback; returnHref: string };

export default function EditFeedbackForm({
  feedback,
  returnHref,
}: EditFeedbackFormProps) {
  /* Router hook */
  const router = useRouter();

  /* Functions */
  const onSubmit = async (data: Feedback | FeedbackAdd) => {
    const patchFeedback = patchFeedbackSchema.parse(data);
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchFeedback),
    };

    const res = await fetch(`/api/feedback/${feedback.id}`, fetchOptions);

    if (res.status !== 200) {
      const error = await res.json();
      console.error(error);
      return;
    }

    router.push(returnHref);
    router.refresh();
  };

  const onDelete = async () => {
    if (feedback === undefined) return;

    const res = await fetch(`/api/feedback/${feedback.id}`, {
      method: "DELETE",
    });

    if (res.status !== 200) {
      const error = await res.json();
      console.error(error);
      return;
    }

    /* Success */
    router.push(returnHref);
    router.refresh();
  };

  /* JSX */
  return (
    <FeedbackForm
      feedback={feedback}
      title={feedback?.title || ""}
      Icon={IconEditFeedback}
      Actions={() => (
        <FeedbackActions cancelHref={returnHref} onDelete={onDelete} />
      )}
      AdditionalFormFieldGroups={AdditionalFormFieldGroups}
      onSubmit={onSubmit}
    />
  );
}
