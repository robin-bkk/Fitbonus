export const transformAnswer = (answer: string) => {
  try {
    const formattedAnswer = answer.replace(/\\/g, "");
    const jsonAnswer = JSON.parse(formattedAnswer);
    let finalString = "";
    switch (jsonAnswer.type) {
      case "timerangedaily":
        const { values } = jsonAnswer;
        for (const element of values) {
          const day = element.day;
          let from = element.from;
          let to = element.to;
          if (from === undefined) {
            from = "   ";
          }
          if (to === undefined) {
            to = "   ";
          }
          const string = day + ": " + from + " - " + to + " Uhr, " + "\n";
          const tempString = finalString.concat(string);
          finalString = tempString;
        }
        return finalString;

      default:
        return answer;
    }
  } catch (error) {
    return answer;
  }
};
