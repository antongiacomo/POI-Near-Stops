import Card from "./Card";
const CardList = ({ probes }) => {
  return (
    <>
      <div className="pt-8 px-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {probes.projects
          .filter((probe) =>
            probe.description.length > 0
          )
          .map((probe) => (
            <Card probe={probe}></Card>
          ))}
      </div>
    </>
  );
};

export default CardList;
