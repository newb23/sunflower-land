import { Button } from "components/ui/Button";
import React, { useContext } from "react";

import secure from "assets/npcs/synced.gif";
import { Context } from "../GoblinProvider";
import { CONFIG } from "lib/config";
import { metamask } from "lib/blockchain/metamask";
import { shortAddress } from "features/farming/hud/components/Address";

export const Withdrawn: React.FC = () => {
  const { goblinService } = useContext(Context);

  const addSflToMetamaskList = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: CONFIG.TOKEN_CONTRACT,
            symbol: "SFL",
            decimals: 18,
            image:
              "https://github.com/sunflower-land/sunflower-land/blob/main/src/assets/brand/icon.png?raw=true",
          },
        },
      });
      if (wasAdded) {
        console.log("The SFL token successfully added to your wallet!");
      } else {
        console.log(
          "Something went wrong adding the SFL token to your wallet. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-center mb-4 mt-1 text-lg">Success!</h1>
        <img src={secure} className="w-14 mb-4" />
        <p className="mb-4">
          Your items/tokens have been sent to:
          <span className="text-center mb-2 ml-2 text-sm">
            {shortAddress(metamask.myAccount as string)}
          </span>
        </p>

        <span className="mb-4">
          You can view your items on{" "}
          <a
            className="underline hover:text-white"
            href="https://opensea.io/account?search[resultModel]=ASSETS&search[sortBy]=LAST_TRANSFER_DATE&search[query]=sunflower%20land"
            target="_blank"
            rel="noreferrer"
          >
            Open Sea
          </a>
        </span>

        <span className="mb-7">
          You can view your tokens by importing the SFL Token to your wallet.
        </span>
        <Button className="mb-7 sm:w-3/4" onClick={addSflToMetamaskList}>
          Import SFL Token to MetaMask
        </Button>
        <span className="mb-4">
          Please note that Open Sea can take up to 30 minutes to display your
          items. You can also view your items on{" "}
          <a
            className="underline hover:text-white"
            href={`https://polygonscan.com/address/${metamask.myAccount}#tokentxnsErc1155`}
            target="_blank"
            rel="noreferrer"
          >
            PolygonScan
          </a>
        </span>
      </div>
      <Button onClick={() => goblinService.send("REFRESH")}>Ok</Button>
    </div>
  );
};
