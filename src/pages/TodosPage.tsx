// TODOリストの表示コンポーネントをインポートします。
import TodoList from "@/components/TodoList";
// TODO追加フォームコンポーネントをインポートします。
import TodoForm from "@/components/TodoForm";
// スタイルシートをインポートします。
import styles from "@/styles/Main.module.css";
// TODO関連のロジックをカプセル化したカスタムフックをインポートします。
import { useTodos } from "@/hooks/useTodos";
// Next.jsのHeadコンポーネントをインポートし、ページのメタデータを管理します。
import Head from "next/head";

// TodosPageコンポーネントは、TODOリストのメインページです。
// カスタムフックからTODOの状態と操作関数を取得し、子コンポーネントに渡します。
export default function TodosPage() {
  // useTodosカスタムフックから、TODOリスト、ローディング状態、およびTODO操作関数を取得します。
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  // データが読み込み中の場合は、「読み込み中...」メッセージを表示します。
  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    // Reactフラグメントを使用して、複数の要素をグループ化します。
    <>
      {/* Headコンポーネントは、Next.jsが提供するもので、ページの<head>要素を管理します。 */}
      <Head>
        <title>TODOリスト</title> {/* ページのタイトルを設定 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* レスポンシブデザインのためのビューポート設定 */}
        <link rel="icon" href="/favicon.ico" /> {/* ファビコンの指定 */}
      </Head>
      {/* 全体のコンテナ。スタイルはMain.module.cssから適用されます。 */}
      <div className={styles.container}>
        {/* メインコンテンツ領域。 */}
        <main className={styles.main}>
          <h1 className={styles.title}>TODOリスト</h1> {/* ページのタイトル */}

          {/* TODO入力セクション。 */}
          <div className={styles.section}>
            <h2>TODO入力</h2> {/* セクションの見出し */}
            {/* TodoFormコンポーネント。新しいTODOを追加するための入力フォームを提供します。
                onAddプロパティを通じて、addTodo関数を呼び出します。 */}
            <TodoForm onAdd={addTodo} />
          </div>

          {/* TODO一覧セクション。 */}
          <div className={styles.section}>
            <h2>TODO一覧</h2> {/* セクションの見出し */}
            {/* TodoListコンポーネント。TODOアイテムのリストを表示します。
                todos: 表示するTODOアイテムの配列
                onToggle: TODOの完了状態を切り替える関数
                onDelete: TODOを削除する関数 */}
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        </main>
      </div>
    </>
  );
}
