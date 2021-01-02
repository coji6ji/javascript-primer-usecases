import { render } from './view/html-util.js'
import { TodoListView } from './view/TodoListView.js'
import { TodoItemModel } from './model/TodoItemModel.js'
import { TodoListModel } from './model/TodoListModel.js'

export class App {
  constructor({ formElement, formInputElement, todoListContainerElement, todoCountElement }) {
    this.todoListView = new TodoListView()
    this.todoListModel = new TodoListModel([])

    this.formElement = formElement
    this.formInputElement = formInputElement
    this.todoListContainerElement = todoListContainerElement
    this.todoCountElement = todoCountElement
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }))
  }

  /**
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed })
  }

  /**
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id })
  }

  /**
   * @param {Event} event
   */
  handleSubmit(event) {
    event.preventDefault()
    const inputElement = this.formInputElement
    this.handleAdd(inputElement.value)
    inputElement.value = ''
  }

  handleChange() {
    const todoCountElement = this.todoCountElement
    const todoListContainerElement = this.todoListContainerElement
    const todoItems = this.todoListModel.getTodoItems()
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed })
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id })
      }
    })
    render(todoListElement, todoListContainerElement)
    todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`
  }

  mount() {
    this.todoListModel.onChange(this.handleChange)
    this.formElement.addEventListener('submit', this.handleSubmit)
  }

  unmount() {
    this.todoListModel.offChange(this.handleChange)
    this.formElement.removeEventListener('submit', this.handleSubmit)
  }
}