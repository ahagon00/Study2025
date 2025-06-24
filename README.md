# Study_Todo アプリケーション

このプロジェクトは、[Next.js] を使用して構築されたシンプルなTodoアプリケーションです。新しくプロジェクトに参加する方が、このアプリケーションのセットアップ、実行、および基本的な構造を理解できるように作成されています。

## 1. はじめに

このアプリケーションは、タスクの管理（追加、表示、削除）を行うためのものです。フロントエンドはNext.jsで、バックエンドはNext.jsのAPIルートを使用しています。

## 2. 開発環境のセットアップ

プロジェクトを開始する前に、以下のツールがインストールされていることを確認してください。

*   [Node.js](https://nodejs.org/ja/) (v18以上を推奨)
*   [npm](https://www.npmjs.com/) (Node.jsに付属)

### 依存関係のインストール

プロジェクトのルートディレクトリで、以下のコマンドを実行して必要な依存関係をインストールします。

```bash
npm install
```

## 3. アプリケーションの実行

依存関係のインストールが完了したら、開発サーバーを起動できます。

```bash
npm run dev
```

サーバーが起動したら、ブラウザで [http://localhost:3000/TodosPage](http://localhost:3000/TodosPage) にアクセスしてアプリケーションを確認できます。

## 4. 主要なファイルとディレクトリ

このプロジェクトの主要なファイルとディレクトリは以下の通りです。

*   `src/pages/TodosPage.tsx`: TODOリストのメインページです。TODOの追加、完了、削除機能が含まれています。
*   `src/components/TodoForm.tsx`: 新しいTODOを追加するためのフォームコンポーネントです。
*   `src/components/TodoList.tsx`: TODOアイテムのリストを表示するコンポーネントです。
*   `src/pages/api/todos.ts`: TODOアイテムの取得、追加、更新、削除を処理するAPIルートです。
*   `src/styles/globals.css`: グローバルなCSSスタイルシートです。
*   `src/styles/Main.module.css`: アプリケーション全体に適用されるモジュールCSSです。

## 5. APIルートについて

このプロジェクトでは、Next.jsの[APIルート]を使用してバックエンド機能を提供しています。

*   `src/pages/api/todos.ts`:
    *   `GET /api/todos`: すべてのTodoアイテムを取得します。
    *   `POST /api/todos`: 新しいTodoアイテムを追加します。
    *   `PUT /api/todos`: 既存のTodoアイテムの完了状態を更新します。リクエストボディに`id`と`completed`を含めます。
    *   `DELETE /api/todos`: 特定のTodoアイテムを削除します。リクエストボディに`id`を含めます。

APIルートは `pages/api` ディレクトリにマッピングされており、このディレクトリ内のファイルはReactページではなくAPIエンドポイントとして扱われます。

## 6. Reactの主要概念（このアプリでの適用例）

*   **カスタムフック (Custom Hooks)**:
    *   `src/hooks/useTodos.ts` で定義されているカスタムフックは、TODOリストのデータフェッチ、状態管理、およびCRUD操作のロジックをカプセル化しています。これにより、`TodosPage.tsx` コンポーネントはUIのレンダリングに集中でき、コードの再利用性と可読性が向上しています。

このアプリケーションでは、Reactの基本的な概念が多数使用されています。

*   **コンポーネント (Components)**:
    *   `TodosPage.tsx`, `TodoForm.tsx`, `TodoList.tsx` など、UIの各部分が独立したコンポーネントとして定義されています。これにより、コードの再利用性と保守性が向上します。
*   **Props (プロパティ)**:
    *   親コンポーネントから子コンポーネントへデータを渡すために使用されます。例えば、`TodosPage.tsx` から `TodoList.tsx` へ `todos`（TODOアイテムの配列）や `onToggle`, `onDelete`（イベントハンドラ関数）がpropsとして渡されています。
    *   `TodoForm.tsx` には `onAdd` 関数がpropsとして渡され、新しいTODOが追加されたときに親コンポーネントに通知します。
*   **State (状態)**:
    *   `useState` フックを使用して、コンポーネント内で変化するデータを管理します。
    *   `TodosPage.tsx` では、`todos`（TODOリスト）の状態を管理するために `useState` が使われています。
    *   `TodoForm.tsx` では、入力フィールドのテキスト (`newTodoText`) の状態を管理するために `useState` が使われています。
*   **Effects (副作用)**:
    *   `useEffect` フックを使用して、コンポーネントのレンダリング後に実行される副作用（データフェッチ、DOM操作など）を扱います。
    *   `TodosPage.tsx` では、コンポーネントがマウントされたときに一度だけTODOリストをAPIからフェッチするために `useEffect` が使われています。
*   **条件付きレンダリング (Conditional Rendering)**:
    *   `TodosPage.tsx` では、`useTodos` フックから返される `loading` 状態に基づいて、「読み込み中...」メッセージを表示するか、実際のTODOリストを表示するかを切り替えています。

## 7. Next.jsのルーティング

Next.jsでは、`pages` ディレクトリ内のファイルが自動的にルーティングされます。

*   `/TodosPage` にアクセスすると、`src/pages/TodosPage.tsx` がレンダリングされます。


## 8. 学習のポイント

このアプリケーションを学ぶ上で、以下の点に注目すると理解が深まります。

*   **コンポーネント間のデータの流れ**: 親コンポーネントから子コンポーネントへpropsを通じてデータがどのように渡され、子コンポーネントから親コンポーネントへイベントハンドラを通じてどのようにデータが戻されるか。
*   **非同期処理**: `fetch` APIと`async/await` を使用したAPIとの連携方法。
*   **状態の更新**: `setTodos` のような状態更新関数がどのように新しいUIをトリガーするか。
*   **TypeScriptの活用**: インターフェース定義 (`interface Todo`) やpropsの型付けが、どのように開発を助けるか。

このアプリをベースに、新しい機能を追加したり、既存の機能を改善したりすることで、さらに実践的な学習を進めることができます。
