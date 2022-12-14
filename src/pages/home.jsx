import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Table } from "../components/table";
import about from "../assets/img/about-2.webp";
import mobileApp from "../assets/img/5.webp";
import { header_images, header_boxes, center_boxes } from "../data";
import { Link } from "react-router-dom";
import Header from "../components/header";
import { ShortBadge, LongBadge } from "../components/badge";

export default function Home() {
  const [markets, setMarkets] = useState();

  const columns = useMemo(
    () => [
      {
        Header: "نام / نماد	",
        accessor: "desName",
        Cell: (props) => {
          const { desName, desNameFa, destinationIcon } = props.row.original;
          return (
            <div className="flex space-x-2 space-x-reverse">
              <div className="w-10">
                <img src={destinationIcon} alt={desNameFa} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span>{desName}</span>
                  {desName.endsWith("3L") ? (
                    <LongBadge />
                  ) : desName.endsWith("3S") ? (
                    <ShortBadge />
                  ) : null}
                </div>
                <span className="text-sm">{desNameFa}</span>
              </div>
            </div>
          );
        },
      },
      {
        Header: "خرید (تومان)",
        accessor: "bestBuy",
        Cell: (props) => {
          const { bestBuy } = props.row.original;
          return (
            <div className="flex items-center text-sm">
              <span>
                {bestBuy.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          );
        },
      },
      {
        Header: "فروش (تومان)",
        accessor: "bestSell",
        Cell: (props) => {
          const { bestSell } = props.row.original;
          return (
            <div className="flex items-center text-sm">
              <span>
                {bestSell.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          );
        },
      },
      {
        Header: "آخرین معامله (تومان)",
        accessor: "latestTrade",
        Cell: (props) => {
          const { latestTrade } = props.row.original;
          return (
            <div className="flex items-center text-sm">
              <span>
                {latestTrade.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          );
        },
      },
      {
        Header: "تغییرات 24 ساعت",
        accessor: "change",
        Cell: (props) => {
          const { change } = props.row.original;
          return (
            <div className="flex items-center">
              <span
                className={`flex items-center text-sm px-3 py-2 rounded bg-opacity-10 ${
                  change > 0
                    ? "bg-emerald-600 text-emerald-600"
                    : "bg-red-600 text-red-600"
                }`}>
                %{change}
              </span>
            </div>
          );
        },
      },
      {
        Header: "نمودار 7 روز گذشته",
        accessor: "chartSvg",
        Cell: (props) => {
          const { chartSvg, change, desNameFa } = props.row.original;
          return (
            <div
              className={`flex items-center ${
                change > 0 ? "filter-green" : "filter-red"
              }`}>
              {chartSvg ? (
                <img src={chartSvg} alt={desNameFa} />
              ) : (
                <span>---</span>
              )}
            </div>
          );
        },
      },
      {
        Header: "",
        accessor: "action",
        Cell: () => (
          <a href="https://app.ubitex.io">
            <button className="text-[#f39200] cursor-pointer transition-all px-5 py-2 bg-[#f39200] bg-opacity-10 hover:bg-opacity-20 rounded-md">
              خرید / فروش
            </button>
          </a>
        ),
      },
    ],

    []
  );

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://api.ubitex.io/api/PublicApi/market")
        .then((res) => {
          const all = res.data.markets;
          setMarkets(all.filter((item) => item.srcName === "TMN"));
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  return (
    <>
      <Header title={"خانه"} />
      <div className="mx-auto">
        <div className="max-w-[1750px] flex justify-center items-center mx-auto">
          {/* Left Box */}
          <div className="w-8/12 top-5 relative max-lg:hidden min-h-[800px]">
            {header_images.map((image) => {
              return (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className={image.class}
                />
              );
            })}
          </div>

          {/* Right Box */}
          <div className="flex flex-col space-y-7 items-end lg:w-4/12 md:w-full text-right">
            <div className="flex flex-col space-y-7">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl dark:text-gray-100 text-gray-800 my-3">
                  یوبیتکس، پلتفرم مبادلات رمزارزی شما
                </h3>
                <h1 className="text-[#f39200] text-4xl font-semibold">
                  معتبرترین صرافی ارز دیجیتال ایرانی
                </h1>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl dark:text-gray-100 text-gray-800">
                  ارئه دهنده خدمات امن و حرفه‌ای بازار ارز دیجیتال
                </h2>
                <h3 className="text-xl dark:text-gray-100 text-gray-800 mt-4">
                  ...داستان پول عوض شد
                </h3>
              </div>
            </div>

            <div className="flex space-x-3 space-x-reverse flex-row-reverse mt-3">
              <Link to="/redirect-to-platform">
                <button className="px-5 py-2 bg-[#f39200] rounded-md">
                  <span>ورود | ثبت‌نام</span>
                </button>
              </Link>
              <Link to="/download">
                <button className="text-[#f39200] cursor-pointer transition-all px-5 py-2 bg-[#f39200] bg-opacity-10 hover:bg-opacity-20 rounded-md">
                  <span>دانلود اپلیکیشن</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" dark:bg-[#04162d] bg-white space-y-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-1 gap-14 max-w-[1500px] items-center mx-auto ">
            {header_boxes.map((data) => {
              return (
                <div
                  className="rtl-grid dark:shadow-[0_15px_40px_-15px_rgba(6,37,70,1)] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] p-7 dark:hover:bg-[#07244b] backdrop-blur hover:backdrop-blur bg-gray-200 hover:bg-gray-300 dark:bg-[#051a36] bg-opacity-25 hover:bg-opacity-30 transition-all rounded-2xl flex flex-col items-start space-y-4 md:mb-3 lg:-mt-16 z-30 cursor-pointer"
                  key={data.id}>
                  <span className="text-3xl dark:bg-[#062246] bg-gray-50 rounded-lg p-3 text-[#f39200]">
                    {data.icon}
                  </span>
                  <h2 className="text-gray-700 dark:text-gray-200 text-lg">
                    {data.title}
                  </h2>
                  <p className="text-sm text-right text-gray-700 dark:text-gray-300">
                    {data.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col max-w-[1600px] mx-auto mt-10">
            <h3 className="text-2xl text-[#f39200] font-semibold text-right mb-10">
              ارزهای دیجیتال یوبیتکس
            </h3>
            {markets ? (
              <div className="max-md:overflow-scroll">
                <Table
                  columns={columns}
                  data={markets.filter(
                    (item) =>
                      item.desName === "BTC" ||
                      item.desName === "ETH" ||
                      item.desName === "USDT" ||
                      item.desName === "SHIB" ||
                      item.desName === "DOGE" ||
                      item.desName === "BTC3S" ||
                      item.desName === "ETH3L" ||
                      item.desName === "DOT" ||
                      item.desName === "ELON" ||
                      item.desName === "DYDX"
                  )}
                />
                <div className="flex mx-auto justify-center items-center  mt-9 mb-5">
                  <Link
                    to={"/markets"}
                    className="text-[#f39200] cursor-pointer transition-all text-lg px-6 py-3 bg-[#f39200] bg-opacity-10 hover:bg-opacity-20 rounded-md">
                    <span>مشاهده همه بازارهای یوبیتکس</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="my-10 flex justify-center items-center">
                <p>...درحال بارگزاری</p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10 max-w-[1600px] mx-auto items-center text-right">
            <div>
              <div className="flex flex-col space-y-3 mb-7">
                <h3 className="text-3xl font-semibold text-[#f39200]">
                  {center_boxes.title}
                </h3>
              </div>
              <div className="mx-auto grid lg:grid-cols-2 md:grid-cols-1 gap-7 rtl-grid cursor-pointer">
                {center_boxes.items.map((data) => {
                  return (
                    <div
                      className="dark:shadow-[0_15px_40px_-15px_rgba(6,37,70,1)] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] p-7 dark:hover:bg-[#07244b] backdrop-blur hover:backdrop-blur bg-gray-200 hover:bg-gray-300 dark:bg-[#051a36] bg-opacity-25 hover:bg-opacity-30 transition-all rounded-2xl flex flex-col items-start space-y-3 md:mb-3 z-30 cursor-pointer"
                      key={data.id}>
                      <span className="text-3xl text-right dark:bg-[#062246] bg-gray-50 rounded-lg p-3 text-[#f39200]">
                        {data.icon}
                      </span>
                      <h2 className="text-lg text-[#f39200]">{data.title}</h2>
                      <p className="text-sm text-right text-gray-700 dark:text-gray-300">
                        {data.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <img src={about} alt="" className="mx-auto animate-ver_5s" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10 max-w-[1600px] mx-auto items-center text-right">
            <div>
              <img src={mobileApp} alt="" className="mx-auto animate-ver_5s" />
            </div>

            <div>
              <div className="flex flex-col space-y-5 mb-3">
                <div className="flex flex-col space-y-2">
                  <span className="text-2xl text-gray-700 dark:text-gray-200">
                    با اپلیکیشن موبایل
                  </span>
                  <span className="text-4xl font-semibold text-[#f39200]">
                    صرافی ارز دیجیتال یوبیتکس
                  </span>
                  <span className="text-2xl text-gray-700 dark:text-gray-200">
                    همیشه بروز باشید
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  معامله آسان، همه جا و همه وقت از طریق اپلیکیشن موبایل یوبیتکس
                </p>
                <Link to={"/download"} className="flex justify-end">
                  <button className="text-[#f39200] cursor-pointer transition-all text-lg px-5 py-2 bg-[#f39200] bg-opacity-10 hover:bg-opacity-20 rounded-md">
                    دانلود اپلیکیشن
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
