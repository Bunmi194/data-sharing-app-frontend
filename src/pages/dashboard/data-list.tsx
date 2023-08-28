import React from "react";
import UserProfile from "./user-profile";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { ImFileEmpty } from "react-icons/im";

const ListData: React.FC<any> = ({ userData }) => {
  return (
    <div className="w-[60%]">
      <UserProfile />
      <h2 className="mb-3 text-lg font-semibold text-center text-yellow-500">
        Uploaded Data
      </h2>
      <div className="max-h-[80vh] overflow-y-auto">
        <div className={`${true ? "grid grid-cols-2 gap-4" : ""}`}>
          {userData.length ? (
            userData.map((data: any) => {
              return (
                <div
                  className="flex justify-between border-[3px] border-slate-200 m-2"
                  key={data.id}
                >
                  <section className="w-[inherit] p-4 text-slate-300">
                    <p>Company: {data.companyName}</p>
                    <p>Number of Users: {data.numberOfUsers}</p>
                    <p>Number of Products: {data.numberOfProducts}</p>
                    <p>Percentage: {`${data.percentage}%`}</p>
                  </section>
                  <section className="flex justify-end items-center p-4">
                    <AiTwotoneDelete
                      className="text-red-500 text-[2rem] cursor-pointer hover:cursor-pointer"
                      onClick={() => console.log(data.id)}
                    />
                    <AiTwotoneEdit className="text-green-500 text-[2rem] cursor-pointer hover:cursor-pointer" />
                  </section>
                </div>
              );
            })
          ) : (
            <div className="w-full ">
              <div className="flex justify-center">
                <ImFileEmpty className="text-[12rem] text-white my-8" />
              </div>
              <div>
                <p className="text-center text-white">
                  You do not have any data yet
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListData;
