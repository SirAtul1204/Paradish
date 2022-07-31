import styles from "../styles/Table-styles.module.css";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

interface TableProps {
  tableHeadings?: string[];
  tableData?: string[][];
}

const Table: FC<TableProps> = ({ tableHeadings, tableData }) => {
  const [searchText, setSearchText] = useState("");

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.searchImg}>
          <Image src="/assets/search.png" alt="search" layout="fill" />
        </div>
        <input
          className={styles.search}
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={changeSearchText}
        />
      </div>
      <div className={styles.major}>
        <table className={styles.table}>
          <thead>
            {tableHeadings?.map((heading, ind) => (
              <th key={heading + ind} className={styles.th}>
                {heading}
              </th>
            ))}
          </thead>
          <tbody>
            {tableData?.map(
              (row, ind) =>
                (searchText === "" ||
                  row.find((val) =>
                    val.toLowerCase().includes(searchText.toLowerCase())
                  )) && (
                  <tr key={row[0] + ind}>
                    {row.map((cell) => (
                      <td key={cell} className={styles.td}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
