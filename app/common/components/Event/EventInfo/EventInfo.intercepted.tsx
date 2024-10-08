"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EventInfoModal } from "./EventInfo.modal";
import { EventInfo, EventInfoRef } from "./_components/EventInfo.component";
import { Event, eventMock } from "./EventInfo.mock";

export const EventInfoIntercepted = () => {
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);
  const EventInfoRef = useRef<EventInfoRef>(null);
  const router = useRouter();

  useEffect(() => {
    delay(2000).then((_) => {
      setEvent(eventMock);
    });
  }, []);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const confirm = useMemo(() => {
    return {
      text: "Join",
      onConfirm: async () => {
        // const data = EventInfoRef.current?.invite();

        // if (!data?.success) {
        //   return;
        // }

        setLoading(true);
        await delay(2000);
        setLoading(false);
        handleCancel();
      },
    };
  }, [handleCancel]);

  const cancel = useMemo(
    () => ({
      onCancel: handleCancel,
    }),
    [handleCancel]
  );

  const action = useMemo(
    () => ({
      onAction: () => {
        window.location.replace("/event/123-456-789");
      },
    }),
    []
  );

  return (
    <EventInfoModal
      open={true}
      dialogLoading={!event}
      title="Lorem ipsum"
      loading={loading}
      cancel={cancel}
      confirm={confirm}
      action={action}
    >
      {event && <EventInfo ref={EventInfoRef} event={event} />}
    </EventInfoModal>
  );
};
