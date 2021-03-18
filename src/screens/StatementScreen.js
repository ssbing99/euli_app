import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';
import PrimeButton from '../elements/PrimeButton';
import { DatePicker, Form, Icon } from 'native-base';
import { hasAccessRight } from '../store/accessRight';
import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
  borderRadius,
  fontSize,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  isIOS
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { CUSTOMERS } from '../static/data';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from 'react-native-paper';
import { getStatementByDateAndId } from '../api/methods/statement';
import { getCustomer } from '../api/methods/customer';
import { connect } from 'react-redux';
import { VIEW_ALL_STMT, VIEW_OWN_STMT } from '../config/access';

class StatementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isChecked: false,
      modalVisible: false,
      selectedState: 'Customer',
      selectedDate: null,
      isSelectedState: false,
      showSearchModal: false,
      isDownloading: false,
      isLoading: false,
      customersList: []
    };
  }


  componentDidMount () {
    console.log('did mount');

    if(hasAccessRight(this.props.role, VIEW_ALL_STMT)) {
      this.getAllCustomer();
    }

    if(hasAccessRight(this.props.role, VIEW_OWN_STMT)) {
      // this.setState({})
    }
  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getAllCustomer = () => {
    try {
      this.updateLoading();
      getCustomer().then(res => {
        if (res.data) {

          let customers = [];
          let c = 0;
          let dataLength = res.data.length;
          res.data.map(data => {
            if (!data.Customer.Id.includes('/')) {
              const added = customers.find(cust => cust.name == data.Customer.CompanyName);

              if (!added) {
                customers.push({id: data.Customer.Id, name: data.Customer.CompanyName});
              }
            }
          });

          this.setState({customersList: customers});
          this.updateLoading();
        }else{
          this.setState({customersList: []});
          this.updateLoading();
        }
      });
    } catch (e) {
      console.log(e);
      this.updateLoading();

    }
  };

  setIsDownloading = (bol) => {
    this.setState({ isDownloading : bol });
  }

  getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  downloadFile = () => {

    this.setIsDownloading(true);

    // let FILE_URL = 'http://application.connaq.com/Cloud_ETT/Reports/Customer12monthStatementSelectionMain_API.aspx?CompanyID=Euli Textile Demo&DivisionID=HQ&DepartmentID=HQ&EmployeeID=Mobile_User&CustomerIDFrom=3000/001&CustomerIDTo=Test&FilterDate=09-04-2020';
    let FILE_URL = 'http://application.connaq.com/Cloud_ETT/(S(whtoxezlippmnvqdchy3tj1t))/EnterpriseASPCommon/CrystalReport/Receivable/Standard/Standard12Statement_API.aspx?CompanyID=Euli%20Textile%20Demo&DivisionID=HQ&DepartmentID=HQ&CustomerFrom=3000/001&CustomerTo=Test&StatementDate=31/01/2021&OpenItem=True.pdf';
    const { dirs } = RNFetchBlob.fs;
    const dirToSave = isIOS ? dirs.DocumentDir : dirs.DownloadDir;
    let date = new Date();
    const title = `statement_${Math.floor(date.getTime() + date.getSeconds() / 2)}.pdf`;
    const filePath = `${dirToSave}/${title}`;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: title,
      path: filePath,
    }
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });

    console.log('The file saved to 23233', configfb, dirs);

    RNFetchBlob.config(configOptions)
    .fetch('GET', FILE_URL, {})
    .then((res) => {
      if (isIOS) {
        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(configfb.path);
      }
      console.log('The file saved to ', res);
      this.setIsDownloading(false);
      alert('File downloaded.');
    })
    .catch((e) => {
      this.setIsDownloading(false);
      console.log('The file saved to ERROR', e.message)
      alert('File download failed.');
    });

  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size={"large"}/>
        </View>
      );
    }

    const source = {
      uri: 'https://stage.thebitetribe.com/uploads/Statement%20Sample.pdf',
      cache: true,
    };

    const modalBtnSetting = {
      btnWidth: responsiveWidth(100),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="STATEMENT"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/search.png'),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
              buttonAction: this._searchModal.bind(this),
            },
          ]}
        />

        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />

        <PrimeButton
          navigation={this.props.navigation}
          setting={modalBtnSetting}
          btnText="Download"
          onPressButton={() => this.downloadFile()}
        />

        <PrimeModal
          modalVisible={this.state.modalVisible}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderBody()}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
        />

        <PrimeModal
          modalVisible={this.state.isDownloading}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderIsLoading()}
        />

        <PrimeModal
          modalVisible={this.state.showSearchModal}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderSearchBody()}
          onRequestClose={() => {
            this.setState({
              showSearchModal: false,
            });
          }}
        />
      </View>
    );
  }

  /**
   * Get size of form component
   */
  onLayout = (e) => {
    this.setState({
      layout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Hide and show state list modal
   */
  toggleModal(visible) {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      modalVisible: visible,
    });
  }

  _searchModal() {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      selectedDate: null,
      selectedState: 'Customer',
    });
  }

  _searchSubmit () {
    console.log(this.state.selectedDate);
    const {selectedDate, selectedStateId, selectedState} = this.state;
    console.log(selectedState);

    const custId = selectedStateId || null;

    console.log(custId);
    if (selectedDate) {
      //TODO: get the correct path
      getStatementByDateAndId(this.state.selectedDate, custId).then(res => {
        console.log(res);
      });
    }

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });
  }

  renderBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody}>
          {this.state.customersList.map((item) => (
            <TouchableHighlight
              key={item.id}
              underlayColor={colors.lightGray}
              onPress={() => this.selectItem(item.id, item.name)}>
              <View style={styles.selectItem}>
                <Text black normal regular>
                  {item.name}
                </Text>
                {this.state.isSelectedState == true &&
                item.name == this.state.selectedState && (
                  <Icon
                    name="ios-checkmark"
                    style={{fontSize: fontSize.large}}
                  />
                )}
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Close"
            onPressButton={() => this.toggleModal(false)}
          />
        </View>
      </View>
    );
  }

  renderIsLoading() {
    return (
      <View style={[CommonStyles.modal, {width: 100, paddingTop: 20}]}>
        <ScrollView style={CommonStyles.modalBody}>
          <View style={styles.form} onLayout={this.onLayout.bind(this)}>
            <ActivityIndicator size={"large"}/>
          </View>
        </ScrollView>
      </View>
    );
  }

  setCalendarDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      this.setState({selectedDate: `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`});
    } else {
      this.setState({selectedDate: null});
    }
  };

  renderSearchBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody}>
          <View style={styles.form} onLayout={this.onLayout.bind(this)}>
            <Form>
              <SelectBox
                isRightIcon
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                  ...SelectBox.defaultProps.containerStyle,
                  flex: 1,
                  marginTop: spaceVertical.small,
                }}
                label={this.state.selectedState}
                onPressAction={() => this.toggleModal(true)}
              />
              <View style={styles.calendarInput}>
                <Image
                  source={require('../../img/icons/calendar.png')}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{ color: colors.black }}
                  placeHolderTextStyle={{ color: colors.gray }}
                  onDateChange={this.setCalendarDate}
                  disabled={false}
                />
              </View>
            </Form>
          </View>
        </ScrollView>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Search"
            underlayColor={colors.red}
            onPressButton={this._searchSubmit.bind(this)}
          />
        </View>
      </View>
    );
  }

  /**
   * Select item on modal list
   *
   * @param: {Integer} id
   * @param: {String} state
   */
  selectItem(id, state) {
    console.log(id,state);
    this.setState({
      selectedStateId: id,
      selectedState: state,
      isSelectedState: true,
    });
  }
}


const mapStateToProps = (state) => {
  return {
    role: state.loginReducer.role,
    userId: state.loginReducer.username,
  }
}

export default connect(mapStateToProps)(StatementScreen);


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingBottom: 20,
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: fontSize.large + spaceVertical.semiSmall,
    paddingHorizontal: marginHorizontal.semiSmall,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
  },
  calendarInput: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 5,
  },
  pdf: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight - NAV_HEIGHT - STATUSBAR_HEIGHT - 20,
  },
});

StatementScreen.propTypes = {
  navigation: PropTypes.any,
};
