import downloadJson from "@hey/helpers/downloadJson";
import {
  type FollowersRequest,
  PageSize,
  useFollowersLazyQuery
} from "@hey/indexer";
import { Button, Card, CardHeader } from "@hey/ui";
import type { FC } from "react";
import { useState } from "react";
import { useAccountStore } from "src/store/persisted/useAccountStore";

const Followers: FC = () => {
  const { currentAccount } = useAccountStore();
  const [followers, setFollowers] = useState<any[]>([]);
  const [exporting, setExporting] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const request: FollowersRequest = {
    account: currentAccount?.address,
    pageSize: PageSize.Fifty
  };

  const [exportFollowers] = useFollowersLazyQuery({
    fetchPolicy: "network-only"
  });

  const handleExportClick = async () => {
    setExporting(true);
    const fetchFollowers = async (cursor?: string) => {
      const { data } = await exportFollowers({
        onCompleted: (data) => {
          setFollowers((prev) => {
            const newFollowers = data.followers.items.filter((newFollower) => {
              return !prev.some(
                (follower) =>
                  follower.follower.address === newFollower.follower.address
              );
            });

            return [...prev, ...newFollowers];
          });
        },
        variables: { request: { ...request, cursor } }
      });

      if (
        data?.followers.items.length === 0 ||
        !data?.followers.pageInfo.next
      ) {
        setFetchCompleted(true);
        setExporting(false);
      } else {
        await fetchFollowers(data?.followers.pageInfo.next);
      }
    };

    await fetchFollowers();
  };

  const handleDownload = () => {
    downloadJson(followers, "followers", () => {
      setFollowers([]);
      setFetchCompleted(false);
    });
  };

  return (
    <Card>
      <CardHeader
        body="Export all your followers to a JSON file."
        title="Export followers"
      />
      <div className="m-5">
        {followers.length > 0 ? (
          <div className="pb-2">
            Exported <b>{followers.length}</b> followers
          </div>
        ) : null}
        {fetchCompleted ? (
          <Button onClick={handleDownload} outline>
            Download followers
          </Button>
        ) : (
          <Button disabled={exporting} onClick={handleExportClick} outline>
            {exporting ? "Exporting..." : "Export now"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Followers;
