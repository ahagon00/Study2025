// Next.jsのAPIリクエストとレスポンスの型をインポートします。
import { NextApiRequest, NextApiResponse } from 'next';

// TODOアイテムの型定義。
interface Todo {
  id: number; // TODOの一意なID
  text: string; // TODOの内容
  completed: boolean; // TODOが完了したかどうかを示すフラグ
}

// 仮のデータストア（実際にはデータベースを使用します）。
// アプリケーションが実行されている間、メモリ上にTODOデータを保持します。
let todos: Todo[] = [];
// 新しいTODOに割り当てる次の一意なID。
let nextId = 1;

// アプリケーション起動時にダミーデータを初期化します。
// これにより、開発中にすぐにTODOリストを確認できます。
if (todos.length === 0) {
  todos.push({ id: nextId++, text: '洗濯', completed: false });
  todos.push({ id: nextId++, text: '買い物', completed: true });
  todos.push({ id: nextId++, text: '夕食作り', completed: false });
}

// GETリクエストを処理する関数。すべてのTODOアイテムを返します。
const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(todos);
};

// POSTリクエストを処理する関数。新しいTODOアイテムを作成します。
const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body; // リクエストボディからTODOのテキストを取得
  // テキストが文字列でない、または空の場合はエラーを返します。
  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'Text is required' });
  }
  // 新しいTODOアイテムを作成し、IDを割り当てます。
  const newTodo: Todo = { id: nextId++, text, completed: false };
  todos.push(newTodo); // TODOリストに追加
  res.status(201).json(newTodo); // 作成されたTODOアイテムを返します。
};

// PUTリクエストを処理する関数。既存のTODOアイテムの完了状態を更新します。
const handlePut = (req: NextApiRequest, res: NextApiResponse) => {
  const { id, completed } = req.body; // リクエストボディからIDと完了状態を取得
  // 該当するIDのTODOアイテムを検索します。
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed; // 完了状態を更新
    res.status(200).json(todo); // 更新されたTODOアイテムを返します。
  } else {
    res.status(404).json({ message: 'Todo not found' }); // 見つからない場合は404エラー
  }
};

// DELETEリクエストを処理する関数。特定のTODOアイテムを削除します。
const handleDelete = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body; // リクエストボディからIDを取得
  const todoId = parseInt(id as string); // IDを数値に変換
  const initialLength = todos.length; // 削除前のリストの長さを記録
  // 該当するIDのTODOアイテムを除外してリストを更新します。
  todos = todos.filter(t => t.id !== todoId);
  // リストの長さが変わった（削除が成功した）場合。
  if (todos.length < initialLength) {
    res.status(204).end(); // 成功（コンテンツなし）を返します。
  } else {
    res.status(404).json({ message: 'Todo not found' }); // 見つからない場合は404エラー
  }
};

// Next.jsのAPIルートのメインハンドラ関数。
// HTTPメソッドに基づいて適切な処理関数を呼び出します。
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res); // GETリクエストの場合
      break;
    case 'POST':
      handlePost(req, res); // POSTリクエストの場合
      break;
    case 'PUT':
      handlePut(req, res); // PUTリクエストの場合
      break;
    case 'DELETE':
      handleDelete(req, res); // DELETEリクエストの場合
      break;
    default:
      // サポートされていないHTTPメソッドの場合、405 Method Not Allowedを返します。
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}