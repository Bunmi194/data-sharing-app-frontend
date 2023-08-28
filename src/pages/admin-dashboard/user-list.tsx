import React from "react";
import { ImFileEmpty } from "react-icons/im";

const UserList: React.FC<any> = ({ users, handleClickUser }) => {
  return (
    <div className="flex-col justify-center items-center w-[25%] h-[100vh] bg-slate-500 pl-0 ml-0">
      <div className="pt-10 m-2 border-b">
        <h1 className="font-bold text-left text-lg text-white">Users</h1>
      </div>
      {users ? (
        users &&
        users.map((user: any) => {
          const id = user.id;
          return (
            <div
              className="flex justify-start items-center border border-red-300 w-[80%] my-5 mx-4 p-3 rounded-lg cursor-pointer"
              onClick={(user) => handleClickUser(id)}
            key={user.id}>
              <div>
                <img
                  src={`${user.profile ? user.profile : "/profile.jpeg"}`}
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className="px-3 text-white">
                <p className="inline-block">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full ">
          <div className="flex justify-center">
            <ImFileEmpty className="text-[4rem] text-white my-8" />
          </div>
          <div>
            <p className="text-center text-white">No User yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
