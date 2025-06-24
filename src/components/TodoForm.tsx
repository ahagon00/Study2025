// ReactのuseStateフックをインポートします。
import { useState } from 'react';
// スタイルシートをインポートします。
import styles from '@/styles/Main.module.css';

// TodoFormコンポーネントのプロパティ（props）の型定義。
interface TodoFormProps {
  // TODOを追加する際に呼び出される関数。新しいTODOのテキストを受け取ります。
  onAdd: (text: string) => void;
}

// TodoFormコンポーネントは、新しいTODOを追加するための入力フォームを提供します。
// 親コンポーネントからonAdd関数をpropsとして受け取ります。
export default function TodoForm({ onAdd }: TodoFormProps) {
  // 新しいTODOのテキストを管理するためのstate。
  const [newTodoText, setNewTodoText] = useState('');

  // 「追加」ボタンがクリックされたときのハンドラ関数。
  const handleClick = () => {
    // 入力されたテキストの前後にある空白を削除します。
    const trimmedText = newTodoText.trim();
    // テキストが空の場合は何もしません。
    if (!trimmedText) return;

    // 親コンポーネントから渡されたonAdd関数を呼び出し、新しいTODOを追加します。
    onAdd(trimmedText);
    // 入力フィールドをクリアします。
    setNewTodoText('');
  };

  return (
    // フォーム全体のコンテナ。
    <div className={styles.form}>
      {/* TODO入力フィールド。 */}
      <input
        id="todo-input" // HTML要素のID。
        type="text" // テキスト入力タイプ。
        value={newTodoText} // inputの値をstateと同期させます。
        onChange={(e) => setNewTodoText(e.target.value)} // 入力値が変更されたときにstateを更新します。
        placeholder="新しいTODOを追加" // 入力フィールドのプレースホルダーテキスト。
        className={styles.input} // スタイルを適用します。
      />
      
      {/* TODO追加ボタン。 */}
      <button
        onClick={handleClick} // クリック時にhandleClick関数を呼び出します。
        className={styles.button} // スタイルを適用します。
        disabled={!newTodoText.trim()} // 入力テキストが空の場合はボタンを無効にします。
      >
        追加
      </button>
    </div>
  );
}