//расчет времени создания бургера
export function timeCreateBurger(createitemBurger: string): string {
  const minute: number = 1000 * 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;

  let todayDate: Date = new Date(); //текущая дата
  let todayDateISO8601 = todayDate.toISOString(); //преобразуем текущуюу дату в формат ISO 8601 YYYY-MM-DDTHH:mm:ss.sssZ

  const todayTime = Date.parse(createitemBurger); //парсим время создания бургера
  const createTimeBurger = Date.parse(todayDateISO8601); //парсим текущее время
  const days = Math.round((createTimeBurger-todayTime) / day); //находим разницу между текущем временем и временем создания бургера
  const createBurgerDay = days != 1 ? 'Сегодня' : 'Вчера';
  const createBurg = new Date(createitemBurger);
  const stringCreateBurger = String(createBurg); //преобразуем дату создания бургера в строку
  const IndexElementGreenwichMeanTime = stringCreateBurger.indexOf("GMT"); //находим с какого индекса начинается GMT
  const GreenwichMeanTime = stringCreateBurger.slice(IndexElementGreenwichMeanTime, IndexElementGreenwichMeanTime+6);

  const createTime: string = (createBurgerDay + ', ' + createBurg.getHours() + ':' + createBurg.getMinutes() + ' i-' + GreenwichMeanTime);
  return createTime;
}
