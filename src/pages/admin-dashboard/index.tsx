import React, { useState, useEffect } from "react";
import UserProfile from "./user-profile";
import UserList from "./user-list";
import ListData from "./data-list";
import axios from "axios";
import Modal from "react-modal";
import { useMyStatsContext } from "../../App";

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<Array<any>>([]);
  const [userId, setUserId] = useState("");

  const { statsData } = useMyStatsContext();
  let statistics: Array<any> = [];
  if (typeof statsData === "object") {
    statistics = statsData;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = JSON.parse(`${localStorage.getItem("isLoggedIn")}`);
    const token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const result = await axios.get(`http://localhost:5000/v1/user`, config);
    const apiResult = result.data;
    if (apiResult.status === true) {
      setUsers(apiResult.records);
      return;
    }
  };

  const handleClickUser = (user: any) => {
    setUserId(user);
  };
  const fetchAllDataGroupedById = async () => {};
  return (
    <div className="">
      <div className="flex">
        <UserList users={users} handleClickUser={handleClickUser} />
        <ListData
          setIsModalOpen={setIsModalOpen}
          userId={userId}
          fetchAllDataGroupedById={fetchAllDataGroupedById}
        />
        <UserProfile users={users} userId={userId} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        bodyOpenClassName="overlays"
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        preventScroll={true}
        closeTimeoutMS={100}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            overflow: "scroll",
            objectFit: "center" as any,
            width: "inherit",
          },
        }}
      >
        <div className="flex justify-center items-center w-full">
          <div className="m-auto w-full h-[70vh] bg-slate-400">
            <div className="flex justify-between ">
              <div className="w-[50%] border-r-8 border-slate-600">
                <div className="pt-1 pb-3 px-4">
                  <p>
                    Name:
                    {statistics.length
                      ? users.find(
                          (user: any) => user.id === statistics[0].userId
                        )?.name
                      : ""}
                  </p>
                  <p>
                    Total Number of Entries:
                    {statistics.length ? statistics[0].companies.length : ""}
                  </p>
                  <p>
                    Total Number of Users:
                    {statistics.length
                      ? statistics[0].companies.reduce(
                          (acc: any, val: any) => acc + val.numberOfUsers,
                          0
                        )
                      : ""}
                  </p>
                  <p>
                    Total Number of Products:
                    {statistics.length
                      ? statistics[0].companies.reduce(
                          (acc: any, val: any) => acc + val.numberOfProducts,
                          0
                        )
                      : ""}
                  </p>
                </div>
                <div className="max-h-[57vh] overflow-scroll bg-slate-900">
                  {statistics[0] &&
                    statistics[0].companies.map((company: any) => {
                      return (
                        <div
                          className="flex justify-between border-[3px] border-slate-200 m-2"
                          key={company.id}
                        >
                          <section className="w-[inherit] p-4 text-slate-300">
                            <p>Company: {company.companyName}</p>
                            <p>Number of Users: {company.numberOfUsers}</p>
                            <p>
                              Number of Products: {company.numberOfProducts}
                            </p>
                            <p>Percentage: {`${company.percentage}%`}</p>
                          </section>
                          <section className="flex justify-end items-center p-4">
                            {/* <AiTwotoneDelete className='text-red-500 text-[2rem] cursor-pointer hover:cursor-pointer' onClick={() => console.log(company.id) } />
                            <AiTwotoneEdit className='text-green-500 text-[2rem] cursor-pointer hover:cursor-pointer' /> */}
                          </section>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-[50%]">
                <div className="flex justify-between">
                  <div className="pt-1 pb-3 px-4">
                    <p>
                      Name:{" "}
                      {statistics.length
                        ? users.find(
                            (user: any) => user.id === statistics[1].userId
                          )?.name
                        : ""}
                    </p>
                    <p>
                      Total Number of Entries:
                      {statistics.length ? statistics[1].companies.length : ""}
                    </p>
                    <p>
                      Total Number of Users:
                      {statistics.length
                        ? statistics[1].companies.reduce(
                            (acc: any, val: any) => acc + val.numberOfUsers,
                            0
                          )
                        : ""}
                    </p>
                    <p>
                      Total Number of Products:
                      {statistics.length
                        ? statistics[1].companies.reduce(
                            (acc: any, val: any) => acc + val.numberOfProducts,
                            0
                          )
                        : ""}
                    </p>
                  </div>
                  <div className="">
                    <p
                      className="text-black font-extrabold text-lg bg-red-400 p-2 cursor-pointer"
                      onClick={closeModal}
                    >
                      X
                    </p>
                  </div>
                </div>
                <div className="max-h-[57vh] bg-slate-900 overflow-scroll">
                  {statistics[1] &&
                    statistics[1].companies.map((company: any) => {
                      return (
                        <div
                          className="flex justify-between border-[3px] border-slate-200 m-2"
                          key={company.id}
                        >
                          <section className="w-[inherit] p-4 text-slate-300">
                            <p>Company: {company.companyName}</p>
                            <p>Number of Users: {company.numberOfUsers}</p>
                            <p>
                              Number of Products: {company.numberOfProducts}
                            </p>
                            <p>Percentage: {`${company.percentage}%`}</p>
                          </section>
                          <section className="flex justify-end items-center p-4">
                            {/* <AiTwotoneDelete className='text-red-500 text-[2rem] cursor-pointer hover:cursor-pointer' onClick={() => console.log(company.id) } />
                            <AiTwotoneEdit className='text-green-500 text-[2rem] cursor-pointer hover:cursor-pointer' /> */}
                          </section>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
