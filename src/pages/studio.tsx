import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./studio.module.css";

export default function Studio(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
  
    return (
      <Layout
        title="OneWare Studio"
        description="Empowering Industry 5.0"
      >
        <main>
          Coming soon
        </main>
      </Layout>
    );
  }