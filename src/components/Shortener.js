import bgMobile from "../images/bg-shorten-mobile.svg";
import bgDesktop from "../images/bg-shorten-desktop.svg";
import axios from "axios";

import { useState } from "react";

export default function Shortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          long_url: "https://dev.bitly.com",
          domain: "bit.ly",
        },
        {
          headers: {
            Authorization: "Bearer bb1be0a23f202fa90ed402b6400744477e1effcf",
            "Content-Type": "application/json",
          },
        }
      );

      const shortUrl = response.data.link;
      setShortenedUrl(shortUrl);
    } catch (error) {
      console.error("API isteği başarısız:", error);
    }
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      setIsCopied(true);
      console.log("Kopyalandı:", shortenedUrl);
    });
  };

  return (
    <>
      <section className="max-width shortener relative">
        <picture>
          <source media="(mix-width: 768px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="" />
        </picture>
        <form className="form" onSubmit={handleShorten}>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Shorten a link here"
              className="w-full py-2 px-5 rounded-lg mb-2 md:mb-0 md:w-2/3"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button
              type="submit"
              className="btn-cta rounded-lg w-full md:w-40 md:ml-5 "
              onClick={handleShorten}
            >
              Shorten It!
            </button>
          </div>
        </form>

        <div
          className="flex flex-col items-center justify-center bg-white text-center
        md:flex-row md:justify-between"
        >
          <article>
            <h6 className="mb-3 md:mb-0"> {originalUrl}</h6>
          </article>
          <article>
            <ul className="md:flex md:items-center">
              <li className="md:mr-5">
                <button className="text-cyan-500">{shortenedUrl}</button>
              </li>
              <li>
                <button
                  onClick={handleCopyToClipboard}
                  disabled={!shortenedUrl}
                  className="btn-cta rounded-lg text-sm"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
