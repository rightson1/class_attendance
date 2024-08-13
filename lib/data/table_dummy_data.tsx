export const activities_created = (() => {
  //return an array with 4 elements each with
  //Agent Name, ActivityName (New activity for a famer, seed planting,farmer onbpording,crop rotation),
  // Categoty(Farm Visit, Trainig,Demo,), Creatyion Date ,Follow UP Date,
  //status(created, sent)

  return [
    {
      agentName: "John Doe",
      activityName: "New activity for a famer",
      category: "Farm Visit",
      creationDate: "2021-08-05",
      followUpDate: "2021-08-07",
      status: "created",
    },
    {
      agentName: "Jane Doe",
      activityName: "seed planting",
      category: "Training",
      creationDate: "2021-08-06",
      followUpDate: "2021-08-08",
      status: "sent",
    },
    {
      agentName: "John Doe",
      activityName: "farmer onboarding",
      category: "Demo",
      creationDate: "2021-08-07",
      followUpDate: "2021-08-09",
      status: "created",
    },
    {
      agentName: "Jane Doe",
      activityName: "crop rotation",
      category: "Farm Visit",
      creationDate: "2021-08-08",
      followUpDate: "2021-08-10",
      status: "sent",
    },
  ];
})();
export type TActivitiesCreated = (typeof activities_created)[0];
