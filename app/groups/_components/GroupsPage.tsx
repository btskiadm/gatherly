import { Stack } from "@mui/material";
import { stack } from "../mock";
import { GroupsListing } from "./GroupsListing";
import { GroupsStack } from "./GroupsStack";

export const GroupsPage = () => {
  return (
    <Stack gap={3}>
      <GroupsListing />
      {stack.map(({ tags, tiles }, idx) => (
        <GroupsStack key={idx} tags={tags} tiles={tiles} />
      ))}
    </Stack>
  );
};
