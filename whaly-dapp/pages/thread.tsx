import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Thread } from "../components/Cards/ThreadCard";
import ThreadCard from "../components/Cards/ThreadCard";
import { BigNumber, ethers } from "ethers";
import Link from "next/link";

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
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <div className={"back-to-the-threads"}>
                &lt; Back to the threads
              </div>
            </Link>
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
            
          </div>
        </div>
      )}
    </>
  );
};

export default ThreadPage;
