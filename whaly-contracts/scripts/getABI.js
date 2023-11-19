const fs = require("fs");
const path = require("path");

const getTheAbi = () => {
    // try {
    //     const dir = path.resolve(
    //         __dirname,
    //         "../artifacts/contracts/WhalyFactory.sol/WhalyFactory.json"
    //     );
    //     const file = fs.readFileSync(dir, "utf8");
    //     const json = JSON.parse(file);
    //     const abi = json.abi;
    //     console.log(`abi`, abi);

    //     fs.writeFileSync("./scripts/abi/WhalyFactoryABI.json", JSON.stringify(abi, null, 2)); // Create WhalyFactoryABI.json file

    //     return abi;
    // } catch (e) {
    //     console.log(`e`, e);
    // }

    try {
        const dir = path.resolve(
            __dirname,
            "../artifacts/contracts/WhalyThread.sol/WhalyThread.json"
        );
        const file = fs.readFileSync(dir, "utf8");
        const json = JSON.parse(file);
        const abi = json.abi;

        fs.writeFileSync("./scripts/abi/WhalyThreadABI.json", JSON.stringify(abi, null, 2)); // Create WhalyThreadABI.json file

        return abi;
    } catch (e) {
        console.log(`e`, e);
    }
};

getTheAbi();
