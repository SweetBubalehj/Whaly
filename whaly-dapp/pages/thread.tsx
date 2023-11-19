import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Thread } from "../components/Cards/ThreadCard";
import ThreadCard from "../components/Cards/ThreadCard";
import { BigNumber, ethers } from "ethers";
import Link from "next/link";
import { Thread as Thread_Page } from "../components/Cards/Thread";

const ThreadPage: React.FC = () => {
  const router = useRouter();
  const [threadData, setThreadData] = useState<Thread | null>(null);

  useEffect(() => {
    const threadDataJSON = router.query.threadData as string;

    if (threadDataJSON) {
      const decodedThreadDataJSON = decodeURIComponent(threadDataJSON);
      const parsedThreadData = JSON.parse(decodedThreadDataJSON);
      setThreadData(parsedThreadData);
    }
  }, [router.query.threadData]);

  return (
    <>
      {threadData && (
        <div className="thread_channel">
          <div className="thread_channel__container">
            <div className={"back-to-the-threads"}>
              <Link href={"/"} style={{ textDecoration: "none", color: "#fff" }}>
                &lt; Back to the threads
              </Link>
            </div>
            <div className="thread_channel__container__content">
              <ThreadCard
                chainId={threadData.chainId}
                contractAddress={threadData.contractAddress}
                tokenAddress={threadData.tokenAddress}
                commentCount={Number(BigNumber.from(threadData.commentCount))}
                tokenSymbol={threadData.tokenSymbol}
                whaleAddress={threadData.whaleAddress}
                totalBalance={Number(BigNumber.from(threadData.totalBalance))}
                isButtonHidden={true}
              />
              <Thread_Page />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThreadPage;
