"use client";
import { css } from "@emotion/react";
import styles from "./counter.module.css";
import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  const style = css`
    color: hotpink;
  `;

  return (
    <>
      <p className={styles.counter}>{count}</p>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increase
      </button>
      <div className={style}>Hello</div>
      <div
        className={css`
          color: hotpink;
          font-size: 20px;
        `}
      >
        Hello Emotion!
      </div>
    </>
  );
}
