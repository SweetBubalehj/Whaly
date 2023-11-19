import Lottie from "lottie-react";
import ThreadCard from "../components/Cards/ThreadCard";
import { useThreadList } from "../hooks/useThreadList";
import loading from "../static/lottie/loading.json";

const Threads = () => {
  const { threadData, isLoading } = useThreadList();

  return (
    <div style={{ marginTop: 64 }}>
      <div className="main-block-text">
        <div className="main-block-h-1">
          <span>
            <span className="main-block-h-1-span">The big fish hang out </span>
            <span className="main-block-h-1-span2">here</span>
          </span>
        </div>
        <div className="main-block-text2">
          Place, where token power shapes conversations
        </div>
      </div>
      {isLoading ? (
        <div style={{ width: 78, margin: "50px auto" }}>
          <Lottie animationData={loading} />
        </div>
      ) : (
        <div className="threads__container">
          {/* <div className="threads__container__header"> */}
            {threadData.map((data, index) =>
              data.contractAddresses.map((contractAddress, innerIndex) => (
                <ThreadCard
                  key={`${index}-${innerIndex}`}
                  chainId={data.chainId}
                  contractAddress={contractAddress}
                  tokenAddress={data.tokenAddresses[innerIndex]}
                  commentCount={data.commentCounts[innerIndex]}
                  tokenSymbol={data.tokenSymbols[innerIndex]}
                  whaleAddress={data.whaleAddresses[innerIndex]}
                  totalBalance={data.totalBalances[innerIndex]}
                />
              ))
            )}
          </div>
        // </div>
      )}
    </div>
  );
};

export default Threads;
