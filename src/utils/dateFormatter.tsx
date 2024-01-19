const handleTime = (value: number): string => `0${value.toString()}`.slice(-2);

const handleDate = (date: Date): number[] => [date.getDate(), date.getMonth(), date.getFullYear()];

const formatDate = (value: string): string => {
  const date = new Date(value);
  const currentDate = new Date();
  const dateArr = handleDate(date);
  const currentDateArr = handleDate(currentDate);

  const matchesArr = dateArr.reduce((acc: number[], item, index) => item === currentDateArr[index] ? [...acc, item] : acc, []);
  const formattedDate = `${[date.getDate(), date.getMonth() + 1].map(item => handleTime(item)).join('.')}.${date.getFullYear()}`;
  const formattedTime = [date.getHours(), date.getMinutes()].map(item => handleTime(item)).join(':');

  return matchesArr.length === 3 ? `Сегодня, ${formattedTime}` : `${formattedDate}, ${formattedTime}`;
};

export default formatDate;
