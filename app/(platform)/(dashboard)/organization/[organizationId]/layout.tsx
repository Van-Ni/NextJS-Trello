import { auth } from "@clerk/nextjs";
import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";

// or Dynamic metadata
export async function generateMetadata() {
  // returns the Authentication object of the currently active user
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  }
}
const OrganizationIdLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;