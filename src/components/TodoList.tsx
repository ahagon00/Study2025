// スタイルシートをインポートします。
import styles from '@/styles/Main.module.css';

// TODOアイテムの型定義。
interface Todo {
  id: number; // TODOの一意なID
  text: string; // TODOの内容
  completed: boolean; // TODOが完了したかどうかを示すフラグ
}

// TodoListコンポーネントに渡されるプロパティ（props）の型を定義します。
interface TodoListProps {
  todos: Todo[]; // 表示するTODOアイテムの配列
  onToggle: (id: number, completed: boolean) => void; // TODOの完了状態を切り替える関数
  onDelete: (id: number) => void; // TODOを削除する関数
}

// TodoListコンポーネントは、TODOアイテムのリストを表示します。
// propsとしてtodos（TODOの配列）、onToggle（完了状態切り替え関数）、onDelete（削除関数）を受け取ります。
function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    // ul要素にスタイルを適用します。
    <ul className={styles.todoList}>
      {/* todos配列をmapメソッドで反復処理し、各TODOアイテムをli要素としてレンダリングします。
          keyプロパティは、Reactがリストの要素を効率的に更新するために必要です。 */}
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          {/* チェックボックス。 */}
          <input
            type="checkbox" // チェックボックスタイプ
            checked={todo.completed} // TODOの完了状態とチェックボックスの状態を同期
            // チェックボックスの状態が変更されたときにonToggle関数を呼び出します。
            // 現在の完了状態を反転させた値を渡します。
            onChange={() => onToggle(todo.id, !todo.completed)}
            className={styles.checkbox} // スタイルを適用
          />
          {/* TODOのテキストを表示するspan要素です。 */}
          <span
            // TODOが完了している場合はテキストに打ち消し線を適用します。
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            className={styles.todoText} // スタイルを適用
          >
            {todo.text}
          </span>
          {/* 削除ボタン。 */}
          <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}

// TodoListコンポーネントをデフォルトエクスポートします。
export default TodoList;