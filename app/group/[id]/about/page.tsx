import { getGroupDetails } from "@/app/mock/mock";
import { GroupAboutPage } from "./_components/GroupAboutPage";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";

export default function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
