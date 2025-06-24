// Next.jsのカスタムDocumentを構成するためのコンポーネントをインポートします。
import { Html, Head, Main, NextScript } from "next/document";

// Documentコンポーネントは、アプリケーションのHTMLドキュメント構造をカスタマイズするために使用されます。
// 通常、<html>, <head>, <body>タグの属性や、カスタムフォントの読み込みなどを設定します。
export default function Document() {
  return (
    // HTMLドキュメントのルート要素。言語属性を設定します。
    <Html lang="en">
      {/* Headコンポーネントは、<head>セクションの内容を定義します。
          ここにメタタグ、リンクタグ、タイトルなどを追加できます。 */}
      <Head />
      {/* <body>要素。 */}
      <body>
        {/* Mainコンポーネントは、Next.jsアプリケーションのメインコンテンツがレンダリングされる場所です。 */}
        <Main />
        {/* NextScriptコンポーネントは、Next.jsが生成するJavaScriptバンドルを挿入します。
            これにより、クライアントサイドのアプリケーションがハイドレーションされます。 */}
        <NextScript />
      </body>
    </Html>
  );
}
