// This function converts status to corresponding button text
export const convertToBtnTextByStatus = (status) => {
  let btnStatusText = "Assign";

  if (status === "inProgress") {
    btnStatusText = "In Progress";
  } else if (status === "completed") {
    btnStatusText = "Completed";
  } else if (status === "deployed") {
    btnStatusText = "Deployed";
  } else if (status === "deferred") {
    btnStatusText = "Deferred";
  }
  
  return btnStatusText;
};
