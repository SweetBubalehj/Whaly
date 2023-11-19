/* Code generated with AutoHTML Plugin for Figma */
import styles from "./Thread.module.css";
import CommentLine from "./CommentLine";

export const Thread = () => {
  return (
    <div className={styles["thread"]}>
      <div className={styles["thread-write"]}>
        <div className={styles["thread-write-input"]}>
          <div className={styles["thread-write-ph"]}>Message </div>
          <textarea className={styles["thread-write-inputt"]}></textarea>
        </div>
        <div className={styles["thread-write-footer"]}>
          <div className={styles["button"]}>
            <div className={styles["connect-wallet"]}>Send message </div>
          </div>
          <div className={styles["thread-write-footer-text"]}>
            You can only send one message. <br />
            Once you have sent it, you will be able to edit it{" "}
          </div>
        </div>
      </div>

      <CommentLine address={"0xDcD6d7D4D3A4967A7EB3A80074588b0641F97d0f"} />
    </div>
  );
};
