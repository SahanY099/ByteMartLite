import { createLazyFileRoute } from "@tanstack/react-router";

import {
  ProfileImageForm,
  ProfileImageFormSkeleton,
} from "@/routes/_browse/account/-components/profile-image-form";
import { NameForm, NameFormSkeleton } from "./-components/name-form";

import { useGetGeneralData } from "@/services/account";

export const Route = createLazyFileRoute("/_browse/account/")({
  component: Account,
});

function Account() {
  const { data, isLoading } = useGetGeneralData();
  return (
    <div className="flex flex-1 flex-col gap-8">
      {isLoading && (
        <>
          <ProfileImageFormSkeleton />
          <NameFormSkeleton />
        </>
      )}
      {data && (
        <>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
            <ProfileImageForm {...data} />
            <div className="flex flex-col gap-1">
              <span className="text-lg">
                {data.firstName} {data.lastName}
              </span>
              <span className="text-muted-foreground">{data.email}</span>
            </div>
          </div>
          <NameForm {...data} />
        </>
      )}
    </div>
  );
}
