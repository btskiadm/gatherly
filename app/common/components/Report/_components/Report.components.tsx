"use client";

import { ReportInput, ZodFlattenIssue, flattenIssues, maxReportContent, reportSchema } from "@/app/common/utils/zod";
import { FormControl, FormLabel, Stack } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Textarea } from "../../Textarea";
import { TruncatedFormHelperText } from "../../TruncatedFormHelperText";

export interface ReportData {
  success: boolean;
  data?: ReportInput;
}

export interface ReportRef {
  handleData: () => ReportData;
}

interface Props {}

export const Report = forwardRef<ReportRef, Props>(({}, ref) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleData = useCallback((): ReportData => {
    const { data, success, error } = reportSchema.safeParse({
      content,
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [content]);

  useImperativeHandle(ref, () => ({
    handleData: handleData,
  }));

  const handleContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const contentError = errors["content"];

  return (
    <Stack width="100%">
      <FormControl error={!!contentError} fullWidth>
        <FormLabel>Report</FormLabel>
        <Textarea placeholder="Description.." minRows={6} value={content} onChange={handleContent} />
        <TruncatedFormHelperText>
          {!contentError ? (
            <>
              Dostępne znaki: {content.length}/{maxReportContent}
            </>
          ) : (
            contentError.message
          )}
        </TruncatedFormHelperText>
      </FormControl>
    </Stack>
  );
});
