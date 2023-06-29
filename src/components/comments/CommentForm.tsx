import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

export default function CommentForm({}: Props) {
  return (
    <Card>
      <h2 className="mb-6">Add Comment</h2>
      <Input className="mb-4" placeholder="Type your comment here" />
      <div className="flex justify-between">
        <span>250 Characters left</span><Button variant="default">Post Comment</Button>
      </div>
    </Card>
  );
}
