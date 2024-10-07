"use client";

import { Event, eventMock } from "@/app/common/components/Event/EventInfo/EventInfo.mock";
import { EventInfo, EventInfoRef } from "@/app/common/components/Event/EventInfo/_components/EventInfo.component";
import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

export const EventPage = () => {
  const [event, setEvent] = useState<Event>(eventMock);
  const [loading, setLoading] = useState(false);
  const EventInfoRef = useRef<EventInfoRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const submit = useMemo(() => {
    return {
      text: "Join",
      onSubmit: async () => {
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

  return <EventInfo ref={EventInfoRef} event={event} />;
};