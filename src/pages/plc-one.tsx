import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./plc-one.module.css";

export default function Studio(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
  
    return (
      <Layout
        title="PLC ONE"
        description="Empowering Industry 5.0"
      >
        <main>
          Coming soon PLC
        </main>
      </Layout>
    );
  }