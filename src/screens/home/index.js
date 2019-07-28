import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavbarTitle} from '../../components';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import {ScrollView, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {
  Container,
  View,
  Text,
  Grid,
  Row,
  Col,
  Card,
  CardItem,
  Body,
  Right,
  Left,
  Icon,
  Button,
  ListItem
} from "native-base";
import HomeHeader from "./HomeHeader";
import Colors from "../../constants/Colors";
import Content from "../../components/Content";
import Loading from "../../components/Loading";
import NavigationService from "../../navigation/Navigation-Service";
import {LineChart} from 'react-native-chart-kit'

class HomeScreen extends Component {

  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerTitle: <HomeHeader/>,
      headerRight: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllStudents(1, this.props.authString);
  }

  calculateFeesCollection = (studentList) => {
    let totalFeesCollection = 0;
    let totalFeesDues = 0;
    for (const student of studentList) {
      const studentDetails = student.studentDetailses[0];
      totalFeesDues = totalFeesDues + (studentDetails.totalFees - studentDetails.feesDiscount);
      const feesCollections = studentDetails.feesCollections;
      for (const feesCollection of feesCollections) {
        totalFeesCollection = totalFeesCollection + feesCollection.amount;
      }
    }
    return {
      totalFeesCollection,
      totalFeesDues
    };
  };

  renderContent() {
    const {studentList, isRequesting} = this.props;
    const feesInfo = this.calculateFeesCollection(studentList);
    if (isRequesting) {
      return <Loading/>;
    } else {
      return (
        <ScrollView>
          <Grid>
            <Row>
              <Col>
                <TouchableOpacity style={styles.touchable} onPress={() => NavigationService.navigate("StudentScreen")}>
                  <Card>
                    <CardItem style={{backgroundColor: Colors.webOrange}}>
                      <Body>
                      <Text style={{fontSize: 20}}>Student Count</Text>
                      <Icon name='ios-school'/>
                      </Body>
                      <Right>
                        <Text style={{fontSize: 20}}>{studentList.length}</Text>
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableOpacity>

              </Col>
            </Row>
            <Row>
              <Content style={{backgroundColor: Colors.anaklawaBlue, marginLeft: 3, marginRight: 3, padding: 5}}>
                <Text style={{fontSize: 20}}>Fees Module</Text>
                <Card>
                  <CardItem style={{backgroundColor: Colors.caribbeanGreen}}>
                    <Body>
                    <Text style={{color: Colors.noticeText}}>Collection</Text>
                    <Icon style={{color: Colors.noticeText}} name='ios-cash'/>
                    </Body>
                    <Right>
                      <Text
                        style={{color: Colors.noticeText}}>₹ {feesInfo.totalFeesCollection.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')}</Text>
                    </Right>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem style={{backgroundColor: Colors.bitterSweetRed}}>
                    <Body>
                    <Text style={{color: Colors.noticeText}}>Dues</Text>
                    <Icon name='ios-sad' style={{color: Colors.noticeText}}/>
                    </Body>
                    <Right>
                      <Text
                        style={{color: Colors.noticeText}}>₹ {feesInfo.totalFeesDues.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </Content>
            </Row>

            <View style={styles.line}/>
            <Content style={styles.container}>
              <Text style={{fontSize: 20}}>Academic Management</Text>
              <Row>
                <Col>
                  <TouchableOpacity style={styles.touchable}
                                    onPress={() => NavigationService.navigate("StandardScreen")}>
                    <Card>
                      <CardItem style={{backgroundColor: Colors.mauvePink}}>
                        <Body>
                        <Text>
                          Class/Standard
                        </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.touchable}
                                    onPress={() => NavigationService.navigate("BatchScreen")}>
                    <Card>
                      <CardItem style={{backgroundColor: Colors.mauvePink}}>
                        <Body>
                        <Text>
                          Batch/Division
                        </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>

              <Row>
                <Col>
                  <TouchableOpacity style={styles.touchable}
                                    onPress={() => NavigationService.navigate("SubjectScreen")}>
                    <Card>
                      <CardItem style={{backgroundColor: Colors.mauvePink}}>
                        <Body>
                        <Text>
                          Subjects
                        </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.touchable}
                                    onPress={() => NavigationService.navigate("ChapterScreen")}>
                    <Card>
                      <CardItem style={{backgroundColor: Colors.mauvePink}}>
                        <Body>
                        <Text>
                          Chapters
                        </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card>
                    <CardItem style={{backgroundColor: Colors.mauvePink}}>
                      <Body>
                      <Text>
                        Attendance
                      </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <CardItem style={{backgroundColor: Colors.mauvePink}}>
                      <Body>
                      <Text>
                        Reports
                      </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </Col>
              </Row>

            </Content>
          </Grid>
        </ScrollView>
      )
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.noticeText
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    padding: 10
  }
});

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const {studentList, errorMessage, isRequesting} = state.userData;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, studentList, errorMessage};
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
