import React from 'react';
import { View } from "react-native";
import { Container, Content } from "../../components";
import UsersList from "./Users-List";

const Layout = ({ listProps }) =>
    <Container>
        <Content noPadding>
            <UsersList listProps={listProps} />
        </Content>
    </Container>

export default Layout;
