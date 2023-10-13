import type { Profile } from "~/db/schemas";

type ProfileOverviewProps = {
  profile: Profile;
};

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Navn:</p>
        <p className="text-lg">{profile.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">ID:</p>
        <p className="text-lg">{profile.id}</p>
      </div>
    </div>
  );
}
