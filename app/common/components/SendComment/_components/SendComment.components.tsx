"use client";

import {
  SendCommentInput,
  ZodFlattenIssue,
  flattenIssues,
  maxComment,
  sendCommentSchema,
} from "@/app/common/utils/zod";
import { FormControl, FormLabel, Rating, Stack } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Textarea } from "../../Textarea";
import { TruncatedFormHelperText } from "../../TruncatedFormHelperText";

export interface SendCommentData {
  success: boolean;
  data?: SendCommentInput;
}

export interface SendCommentRef {
  send: () => SendCommentData;
}

interface Props {}

export const SendComment = forwardRef<SendCommentRef, Props>(({}, ref) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(5);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleSend = useCallback((): SendCommentData => {
    const { data, success, error } = sendCommentSchema.safeParse({
      comment,
      rate,
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [comment, rate]);

  useImperativeHandle(ref, () => ({
    send: handleSend,
  }));

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const handleRate = useCallback((_: unknown, value: number | null) => {
    setRate(value as number);
  }, []);

  const commentError = errors["comment"];
  const rateError = errors["rate"];

  return (
    <Stack gap={3} width="100%">
      <Stack gap={2}>
        <FormControl error={!!rateError} fullWidth required>
          <FormLabel>Ocena</FormLabel>
          <Rating value={rate} onChange={handleRate} />
        </FormControl>
        <FormControl error={!!commentError} fullWidth required>
          <FormLabel>Komentarz</FormLabel>
          <Textarea
            minRows={6}
            placeholder="Type a comment.."
            value={comment}
            sx={{
              width: "100%",
            }}
            onChange={handleChange}
          />
          <TruncatedFormHelperText>
            {!commentError ? (
              <>
                Dostępne znaki: {comment.length}/{maxComment}
              </>
            ) : (
              commentError.message
            )}
          </TruncatedFormHelperText>
        </FormControl>
      </Stack>
    </Stack>
  );
});
