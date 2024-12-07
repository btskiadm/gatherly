import { Stack } from "@mui/material";
import { GroupsListing } from "./GroupsListing";
import { getGroupTiles } from "@/app/mock/mock-api";
import { GroupTilesList } from "./GroupTilesList";

//todo: mock
const tiles = getGroupTiles().slice(0, 50);

export const GroupsPage = () => {
  return (
    <Stack gap={3}>
      <GroupsListing />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
