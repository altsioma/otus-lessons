// Задание первого уровня 3
// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить FIXME на соответствующий тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME<T, K extends keyof T> = Omit<T, K>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<string, number>, K extends keyof T>(
  obj: T,
  keyToOmit: K
): FIXME<T,K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};
