import React from 'react';
import { Image } from 'react-native';
import { DangerZone } from 'expo';
import splash from '../../../assets/images/logo_without_name.png';
import { Container } from "native-base";
import styles from "./style";

const { Lottie } = DangerZone;

const Layout = ({ animation, setAnimationRef }) => (
    <Container style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={splash} />
        {animation &&
            <Lottie
                ref={setAnimationRef}
                style={styles.animation}
                source={animation}
            />}
    </Container>
)

export default Layout;
