import styles from "./Header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as svg from "../../static/svg/svg";
import Image from "next/image";
import CustomConnectButton from "../Buttons/CustomConnectButton";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__wrapper__container}>
          <div className={styles.header__wrapper__container__left}>
            <div className={styles.header__wrapper__container__left__logo}>
              <Image src={svg.whale} alt="Whaly" />
              <Image
                src={svg.whale_text}
                alt="Whaly_text"
                style={{ marginTop: 8 }}
              />
            </div>
            <div className={styles.header__wrapper__container__left__links}>
              <a>Threads</a>
              <a>Create thread</a>
              <a>FAQ</a>
            </div>
          </div>
          <div className={styles.header__wrapper__container__right}>
            {/* <div className={styles.header__wrapper__container__connect}> */}
            <CustomConnectButton />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
