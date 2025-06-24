// グローバルスタイルシートをインポートします。
import "@/styles/globals.css";
// Next.jsのAppProps型をインポートします。
import type { AppProps } from "next/app";
// Next.jsのLinkコンポーネントをインポートし、クライアントサイドのナビゲーションを可能にします。
import Link from "next/link";
// スタイルシートをインポートします。
import styles from "@/styles/Main.module.css";

// Appコンポーネントは、すべてのページで共通のレイアウトや機能を定義します。
// Next.jsによって各ページコンポーネントにラップされて使用されます。
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Reactフラグメントを使用して、複数の要素をグループ化します。
    <>
      {/* ナビゲーションバー。 */}
      <nav className={styles.navbar}>
        {/* TODOリストページへのリンク。 */}
        <Link href="/TodosPage" className={styles.navLink}>
          TODOリスト
        </Link>
      </nav>
      {/* 現在のページコンポーネントをレンダリングします。
          pagePropsは、getServerSidePropsやgetStaticPropsから渡されるプロパティです。 */}
      <Component {...pageProps} />
    </>
  );
}
