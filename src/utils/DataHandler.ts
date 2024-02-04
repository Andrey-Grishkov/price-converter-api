class DataHandler {
  public makeData = (): string => {
    const currentDate = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();
    const formattedDate: string = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
  };
}

const dataHandler = new DataHandler();
export const formattedDate: string = dataHandler.makeData();
