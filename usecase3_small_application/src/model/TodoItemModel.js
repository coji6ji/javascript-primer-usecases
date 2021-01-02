let todoIdx = 0;

export class TodoItemModel {
  /**
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    this.id = todoIdx++
    this.title = title
    this.completed = completed
  }

  /**
   * @returns {boolean}
   */
  isEmptyTitle() {
    return this.title.length === 0
  }
}