import styles from "./Header.module.css";
import * as svg from "../../static/svg/svg";
import Image from "next/image";
import CustomConnectButton from "../Buttons/CustomConnectButton";
import Link from "next/link";
import CreateThread from "../PopUps/CreateThread";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__wrapper}>
          <div className={styles.header__wrapper__container}>
            <div className={styles.header__wrapper__container__left}>
              <div className={styles.header__wrapper__container__left__logo}>
                <Link href="/">
                  <Image src={svg.whale} alt="Whaly" />
                  <Image
                    src={svg.whale_text}
                    alt="Whaly_text"
                    style={{ marginTop: 8 }}
                  />
                </Link>
              </div>
              <div className={styles.header__wrapper__container__left__links}>
                <Link href="/threads">Threads</Link>
                <a onClick={() => setIsOpen(true)}>Create thread</a>
              </div>
            </div>
            <div className={styles.header__wrapper__container__right}>
              {/* <CustomConnectButton /> */}
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
      {isOpen && <CreateThread onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
