import { NextPage } from "next";
import { Title } from "../components/title";

const Help: NextPage = () => {
  return (
    <div className="flex flex-col m-4">
      <Title></Title>
      <h2></h2>
      <table className="w-2/6">
        <thead>
          <tr>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td># </td>
            <td>h1</td>
          </tr>
          <tr>
            <td>## </td>
            <td>h2</td>
          </tr>
          <tr>
            <td>### </td>
            <td>h3</td>
          </tr>
          <tr>
            <td>#### </td>
            <td>h4</td>
          </tr>
          <tr>
            <td>##### </td>
            <td>h5</td>
          </tr>
          <tr>
            <td>###### </td>
            <td>h6</td>
          </tr>
          <tr>
            <td>- </td>
            <td>unordered list</td>
          </tr>
          <tr>
            <td>--- </td>
            <td>horizontal rule</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Help;
