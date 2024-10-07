import { Button, Stack } from "@mui/material";
import { Link } from "@/app/common/components/NextLink";
import { GroupEventsTabs } from "../_components/GroupEventsTabs";
import { GroupHeader } from "../../_components/GroupHeader";

export const GroupEventsPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader
        primary="Events"
        subPrimary="(99+)"
        secondary="See scheduled group eventsevents."
        actions={
          <>
            <Button
              variant="outlined"
              color="secondary"
              LinkComponent={Link}
              href="events/createEvent"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                height: "min-content",
                textWrap: "nowrap",
              }}
            >
              Create an event
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              LinkComponent={Link}
              href="events/createEvent"
              sx={{
                display: {
                  xs: "inline-flex",
                  sm: "none",
                },
                height: "min-content",
                textWrap: "nowrap",
              }}
            >
              Create
            </Button>
          </>
        }
      />
      <GroupEventsTabs />
    </Stack>
  );
};