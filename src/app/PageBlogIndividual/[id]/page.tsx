import Layout from "../../sharedComponents/Layout";
import BlogIndividual from "./../BlogIndividual";


export default function Home() {
  return (
    <Layout headerType="header1" footerType="footer1">
      <BlogIndividual />
    </Layout>
  );
}