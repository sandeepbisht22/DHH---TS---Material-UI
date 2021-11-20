import React, { useEffect, useState, Fragment } from "react";

const YoutubeVideo = ({ channelId, youtubeKey }) => {
  const [channelVideoInfos, setChannelVideoInfos] = useState([]);
  const [channelInfos, setChannelInfos] = useState([]);

  useEffect(async () => {
    if (channelVideoInfos.length === 0) {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=viewCount&key=${youtubeKey}`
        // "http://localhost:5000/sampleyoutubefirstcall"
      );
      const channelJson = await res.json();
      //channelInfos = channelJson.items;
      setChannelInfos(channelJson.items);

      // setChannelInfos(channelJson[0].items);
      //      channelInfos = channelJson[0].items;

      console.log(channelInfos);
    }

    await Promise.all(
      channelInfos.map(async (channelInfo) => {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${channelInfo.id.videoId}&key=${youtubeKey}`
          // "http://localhost:5000/sampleyoutubesecondcall"
        );
        const data = await response.json();
        setChannelVideoInfos((channelVideoInfos) => [
          ...channelVideoInfos,
          // data[0].items,
          data.items,
        ]);
        console.log(channelVideoInfos);
      })
    );
  }, []);

  return (
    channelInfos !== null &&
    channelInfos.length > 0 && (
      <Fragment>
        {/* <div className="container ps-0">
          <div className="row">
             */}
        {channelInfos.map((channelInfo) => (
          <div className="col-md-3">
            <div className="pb-1">
              <a
                href={`https://www.youtube.com/watch?v=${channelInfo.id.videoId}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={channelInfo.snippet.thumbnails.medium.url}
                  className="border border-3 rounded"
                />
              </a>
              {/* <div className="ps-3">
                    <div className="ps-2 flex-column">
                      <div className="pb-1">
                        <i
                          class="fas fa-thumbs-up fa-3x"
                          style={{ color: "#FFFFFF" }}
                        ></i>
                        <span
                          className="ps-2 ms-2"
                          style={{ color: "#FFFFFF" }}
                        >
                          12334
                        </span>
                      </div>
                      <div className="pb-1">
                        <i
                          class="fas fa-thumbs-down fa-3x"
                          style={{ color: "#FFFFFF" }}
                        ></i>
                        <span
                          className="ps-2 ms-2"
                          style={{ color: "#FFFFFF" }}
                        >
                          12334
                        </span>
                      </div>
                      <div className="pb-1">
                        <i
                          class="fas fa-eye fa-3x"
                          style={{ color: "#FFFFFF" }}
                        ></i>
                        <span
                          className="ps-2 ms-2"
                          style={{ color: "#FFFFFF" }}
                        >
                          12334
                        </span>
                      </div>
                      <div className="pb-1">
                        <i
                          class="fas fa-comments fa-3x"
                          style={{ color: "#FFFFFF" }}
                        ></i>
                        <span
                          className="ps-2 ms-2"
                          style={{ color: "#FFFFFF" }}
                        >
                          12334
                        </span>
                      </div>
                    </div>
                  </div> */}
            </div>
            <div style={{ color: "#FFFFFF" }} className="flex-wrap ">
              {channelInfo.snippet.title}
            </div>
          </div>
        ))}
        {/* </div>
        </div> */}
      </Fragment>
    )
  );
};

export default YoutubeVideo;
