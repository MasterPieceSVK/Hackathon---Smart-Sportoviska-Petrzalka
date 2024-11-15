interface ProfileCardProps {
  meno: string | null | undefined;
  pic: string | null | undefined;
  mail: string | null | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ meno, pic, mail }) => {
  return (
    <div className="mx-auto mt-8 max-w-sm overflow-hidden rounded-lg border-2 border-black bg-white shadow-lg">
      <img
        src={pic ?? ""}
        alt={`${meno}'s profile`}
        className="mx-auto mt-8 rounded-full object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Meno</h2>
        <p className="rounded-lg border border-gray-500 p-2">{meno}</p>
        <h2 className="text-xl font-semibold text-gray-800">Mail</h2>
        <p className="rounded-lg border border-gray-500 p-2">{mail}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
