const Card = ({ probe }) => {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex justify-center">
        <img
          className="w-24 h-24 object-cover rounded-full shadow-md"
          src={probe.avatar_url}
        ></img>
      </div>
      <h1 className="text-left pt-8 pl-8 font-bold text-lg">
        {Capitalize(probe.name)}
      </h1>
      <h1 className="text-left pt-4 pl-8 text-sm">{probe.description}</h1>
    </div>
  );
};
const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default Card;
