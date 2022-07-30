import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { config, Deleteuser } from "../Api";
import { Flex, FlexRow } from "../share/Container";
import { Space } from "../share/Space";
import { ThemedText } from "../ThemedText";
import { USerInfo } from "./type";

export const UserComponent = ({
  name,
  family,
  email,
  address,
  number,
  createdAt,
  userId,
}: USerInfo): JSX.Element => {
  const [token, settoken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const admintoken: any = localStorage.getItem("token");
    settoken(admintoken);
  }, []);

  //delete user handle
  const deleteuser = async (id: any): Promise<void> => {
    try {
      axios
        .delete(
          `${config.apiUrl}/api/data/admin/deleteUser/${id}`,
          // {},
          {
            headers: {
              authorization: token as string,
            },
          }
        )
        .then((result) => {
          console.log(result);
          if ((result?.status as number) == 200) {
            console.log(result?.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flexul>
      <Text>{name}</Text>
      <Text>{family}</Text>
      <Text>{email}</Text>
      <Text>{address}</Text>
      <Text>{number}</Text>

      <Flex>
        <Text>{createdAt}</Text>
        <Span>
          <span onClick={() => deleteuser(userId)}>
            <FiTrash2 />
          </span>
          <Space horizontal={10} />

          <span
            onClick={() =>
              router.push({
                pathname: "/users/userInfo",
                query: { id: userId },
              })
            }
          >
            <FiEdit2 />
          </span>
        </Span>
      </Flex>
    </Flexul>
  );
};

const Flexul = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;

  text-align: left;
  height: 60px;
  border-top: 1px solid #7a7a7a30;

  div {
    width: calc(100% / 7);
    margin: 0;

    display: flex;
    align-items: flex-end;
    text-align: left;
  }
`;

const Text = styled.div`
  text-transform: capitalize;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
