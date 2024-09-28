export interface Page<T> {
  content: T[];           // Список пользователей
  totalElements: number;   // Общее количество элементов
  totalPages: number;      // Общее количество страниц
  size: number;            // Размер страницы (количество элементов на странице)
  number: number;          // Номер текущей страницы (начинается с 0)
  first: boolean;          // Это первая страница
  last: boolean;           // Это последняя страница
}
