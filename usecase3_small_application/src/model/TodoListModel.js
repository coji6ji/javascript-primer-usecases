import { EventEmitter } from '../EventEmitter.js'

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items]
   */
  constructor(items = []) {
    super()
    this.items = items
  }

  getTotalCount() {
    return this.items.length
  }

  getTodoItems() {
    return this.items
  }

  /**
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener('change', listener)
  }

  /**
   * @param {Function} listener
   */
  offChange(listener) {
    this.removeEventListener('chagen', listener)
  }

  emitChange() {
    this.emit('change')
  }

  /**
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    if (todoItem.isEmptyTitle()) {
      return
    }
    this.items.push(todoItem)
    this.emitChange()
  }

  /**
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    const todoItem = this.items.find(todo => todo.id === id)
    if (!todoItem) {
      return
    }
    todoItem.completed = completed
    this.emitChange()
  }

  /**
   * @param {{ id: number }}
   */
  deleteTodo({ id }) {
    this.items = this.items.filter(todo => {
      return todo.id !== id
    })
    this.emitChange()
  }
}