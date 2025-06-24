// ReactのuseStateとuseEffectフックをインポートします。
import { useState, useEffect } from 'react';

// TODOアイテムの型定義。
interface Todo {
  id: number; // TODOの一意なID
  text: string; // TODOの内容
  completed: boolean; // TODOが完了したかどうかを示すフラグ
}

// useTodosカスタムフックは、TODOリストのデータフェッチ、状態管理、およびCRUD操作のロジックを提供します。
export function useTodos() {
  // TODOアイテムの配列を管理するstate。
  const [todos, setTodos] = useState<Todo[]>([]);
  // データの読み込み状態を管理するstate。
  const [loading, setLoading] = useState(true);

  // コンポーネントがマウントされたときに一度だけTODOをフェッチします。
  useEffect(() => {
    fetchTodos();
  }, []); // 空の依存配列は、このエフェクトが初回レンダリング時のみ実行されることを意味します。

  // TODOリストをAPIからフェッチする非同期関数。
  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos"); // /api/todosエンドポイントからデータを取得
      const data = await res.json(); // 取得したレスポンスをJSON形式にパース
      setTodos(data); // 状態を更新し、UIにTODOリストを反映
    } catch (error) {
      console.error("Failed to fetch todos:", error); // エラーが発生した場合、コンソールに表示
    } finally {
      setLoading(false); // データ取得が完了したら、ローディング状態をfalseに設定
    }
  };

  // 新しいTODOを追加する非同期関数。
  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", { // /api/todosエンドポイントにPOSTリクエストを送信
      method: "POST", // HTTPメソッドをPOSTに設定
      headers: {
        "Content-Type": "application/json", // リクエストボディの形式をJSONに設定
      },
      body: JSON.stringify({ text }), // TODOの内容をJSON形式で送信
    });
    const newTodo = await res.json(); // 追加されたTODOの情報を取得
    setTodos((prevTodos) => [...prevTodos, newTodo]); // 既存のTODOリストに新しいTODOを追加して状態を更新
  };

  // TODOの完了状態を切り替える非同期関数。
  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch("/api/todos", { // /api/todosエンドポイントにPUTリクエストを送信
      method: "PUT", // HTTPメソッドをPUTに設定
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed }), // 更新するTODOのIDと完了状態を送信
    });
    const updatedTodo = await res.json(); // 更新されたTODOの情報を取得
    setTodos((prevTodos) =>
      // TODOリストを更新します。該当するTODOのcompleted状態を切り替えます。
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // TODOを削除する非同期関数。
  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", { // /api/todosエンドポイントにDELETEリクエストを送信
      method: "DELETE", // HTTPメソッドをDELETEに設定
      headers: {
        "Content-Type": "application/json", // リクエストボディの形式をJSONに設定
      },
      body: JSON.stringify({ id }), // 削除するTODOのIDをJSON形式で送信
    });
    // 削除されたTODOを除外した新しいリストで状態を更新します。
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // コンポーネントに提供する状態と関数を返します。
  return { todos, loading, addTodo, toggleTodo, deleteTodo };
}