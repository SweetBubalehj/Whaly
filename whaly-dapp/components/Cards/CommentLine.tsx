import MinidenticonImg from "../MinidactionImg";
import styles from "./Thread.module.css";

type Comment = {
  address: string;
  comment: string;
  symbol: string;
  balance: number;
  decimals?: number;
  whale?: boolean;
};

const CommentLine: React.FC<Comment> = ({
  address,
  comment,
  symbol,
  balance,
  decimals,
  whale,
}) => {
  return (
    <>
      <div className={styles["line"]}></div>
      <div className={styles["thread-written-message"]}>
        <div className={styles["thread-written-message-headeer"]}>
          <div className={styles["thread-written-message-author"]}>
            <div className={styles["thread-written-message-author-avatar"]}>
              <MinidenticonImg
                symbol={address}
                saturation={40}
                lightness={60}
                width={24}
                height={24}
              />
            </div>
            <div className={styles["thread-written-message-author-wallet"]}>
              <div
                className={
                  styles["thread-written-message-author-wallet-adress"]
                }
              >
                <span>
                  <span
                    className={
                      styles["thread-written-message-author-wallet-adress-span"]
                    }
                  >
                    <a className={styles[whale ? "gradient" : ""]}>{address}</a>
                  </span>
                  {whale && (
                    <span
                      className={
                        styles[
                          "thread-written-message-author-wallet-adress-span2"
                        ]
                      }
                    >
                      🐋
                    </span>
                  )}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["thread-written-message-mssg"]}>
          <div className={styles["thread-written-message-mssg-text"]}>
            {comment}
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["thread-written-message-mssg-footer"]}>
            <div
              className={styles["thread-written-message-mssg-footer-balance"]}
            >
              <div
                className={
                  styles[
                    "thread-written-message-mssg-footer-balance-ph-message-mssg-footer-ph"
                  ]
                }
              >
                Balance:
              </div>
              <div
                className={
                  styles["thread-written-message-mssg-footer-balance-count"]
                }
              >
                {decimals ? balance / 10 ** decimals : balance + " " + symbol}
              </div>
            </div>
            {/* <div className={styles["thread-written-message-mssg-footer-date"]}>
              19.11.2023 13:53{" "}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentLine;
