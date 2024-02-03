class DataHandler {
  makeData = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
  }
}

const dataHandler = new DataHandler();
const formattedDate = dataHandler.makeData();

module.exports = formattedDate;
