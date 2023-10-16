import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const NotFound = () => {
  return (
    <div className={styles.page}>
      <h2> Page not found</h2>
      <p>
        But you can return
        <Link className={styles.page__link} to={"/crypto"}>
          back
        </Link>
        and find something else
      </p>
    </div>
  );
};

export default NotFound;
