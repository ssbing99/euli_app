import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image, Linking, PermissionsAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';
import PrimeButton from '../elements/PrimeButton';
import { DatePicker, Form, Icon, Toast } from 'native-base';
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
  isIOS, inputHeight
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { CUSTOMERS } from '../static/data';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from 'react-native-paper';
import { getStatementByDateAndId } from '../api/methods/statement';
import { getCustomer } from '../api/methods/customer';
import { connect } from 'react-redux';
import { VIEW_ALL_CUSTOMER, VIEW_ALL_STMT, VIEW_OWN_STMT } from '../config/access';
import TextInput from '../elements/TextInput';

let timeOutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

class StatementScreen extends Component {
  constructor(props) {
    super(props);
    this.hasPermission = false;
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      filePath: '',//'http://application.connaq.com/Cloud_ETT/UploadFiles/Customer12MonthStatement_TW9iaWxlX1VzZXI=.pdf',
      isChecked: false,
      modalVisible: false,
      selectedState: 'Customer',
      selectedDate: null,
      isSelectedState: false,
      showSearchModal: false,
      isDownloading: false,
      isLoading: false,
      customerIds: [],
      customersList: [],
      customersListDisplay: [],
      customersListPage: [],
    };

    this.customerListInit = 30;
    this.customerListCurrPage = 2;
  }


  componentDidMount () {
    console.log('did mount');

    if(hasAccessRight(this.props.role, VIEW_ALL_STMT)) {
      this.getAllCustomer();
    }

    if(hasAccessRight(this.props.role, VIEW_OWN_STMT)) {
      // this.setState({})
    }
    if(!isIOS){
      this.requestStoragePermission().then( res => this.hasPermission = res);
    }else{
      this.hasPermission = true;
    }

  }

  requestStoragePermission = async () => {
    try {
      const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if(!check){
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permission to store file to phone.",
            message:
              "We need your permission to save file to your phone.",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }else{
        return true;
      }

    } catch (err) {
      console.warn(err);
    }
  };

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
          let customersPage = [];
          let cnt = 0;
          let c = 0;
          let dataLength = res.data.length;
          res.data.map(data => {
            if (data.Customer.Id != null && data.Customer.Id != '' && data.Customer.CompanyName) {
              const added = customers.find(cust => cust.name == data.Customer.CompanyName);

              if (!added) {
                customers.push({id: data.Customer.Id, name: data.Customer.CompanyName});

                if (cnt <= 30 && customersPage.indexOf({id: data.Customer.Id, name: data.Customer.CompanyName}) == -1) {
                  customersPage.push({id: data.Customer.Id, name: data.Customer.CompanyName});
                  cnt++;
                }
              }
            }
          });

          const oriItemIds = [...customers];
          const resultcustomer = new Array(Math.ceil(customers.length / this.customerListInit )).fill().map(_ => customers.splice(0, this.customerListInit));
          this.setState({customerIds: oriItemIds, customersList: customersPage, customersListDisplay: customersPage, customersListPage: resultcustomer});
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

  filterKey = keywordInner => {

    const {customerIds} = this.state; // origin list
    let tempNewList;
    let customersListDisplay;
    if(keywordInner && keywordInner != '') {
      // Filter origin with keyword, update customersListDisplay, itemIdListCurrPage = 2
      customersListDisplay = customerIds.filter(data => data.name.toLowerCase().includes(keywordInner.toLowerCase().trim()));
      tempNewList = [...customersListDisplay];
    }else{
      customersListDisplay = this.state.customersList;
      tempNewList = [...customerIds];
    }

    const resultcustomer = new Array(Math.ceil(tempNewList.length / this.customerListInit )).fill().map(_ => tempNewList.splice(0, this.customerListInit));
    this.setState({customersListDisplay: customersListDisplay, customersListPage: resultcustomer});

    this.customerListCurrPage = 2;
  }

  handleKeywordChange = (text) => {
    this.debounceSearch(text);
  }

  debounceSearch = debounce(this.filterKey, 500);

  addListOfCustomers = () => {
    //TODO: Need to clean up on close

    const { customersListPage, customersListDisplay } = this.state;

    let newArr = [];

    if(this.customerListCurrPage <= customersListPage.length) {

      for (let i = 0; i < this.customerListCurrPage; i++) {
        newArr = [...newArr, ...customersListPage[i]];
      }

      // console.log('result', newArr);
      this.setState({customersListDisplay: newArr});

      this.customerListCurrPage += 1;
    }
  }

  setIsDownloading = (bol) => {
    this.setState({ isDownloading : bol });
  }

  getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  downloadFile = () => {

    if(this.state.filePath && this.state.filePath != '' && this.state.filePath.indexOf('.pdf') > -1) {
      console.log(this.hasPermission);
      if(this.hasPermission){
        // this.setIsDownloading(true);

        // let FILE_URL = 'https://www.eesd2020.org/wp-content/uploads/2018/10/dummy.pdf';
        let FILE_URL = this.state.filePath;
        const {dirs} = RNFetchBlob.fs;
        const dirToSave = isIOS? dirs.DocumentDir : dirs.DownloadDir;
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

        // Linking.canOpenURL(FILE_URL).then(supported => {
        //   if (supported) {
        //     Linking.openURL(FILE_URL);
        //   } else {
        //     console.log('Not Supported. ' + supported);
        //   }
        // });

        RNFetchBlob.config(configOptions).fetch('GET', FILE_URL, {}).then((res) => {
          if (isIOS) {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configfb.path);
          }
          console.log('The file saved to ', res);
          // this.setIsDownloading(false);
          alert('File downloaded.');
        }).catch((e) => {
          // this.setIsDownloading(false);
          console.log('The file saved to ERROR', e.message)
          alert('File download failed.');
        });
      }



    }else{
      this._searchModal();
    }
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
      // uri: 'https://stage.thebitetribe.com/uploads/Statement%20Sample.pdf',
      uri: this.state.filePath,
      cache: false,
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

        {(this.state.filePath != null && this.state.filePath != '') &&
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
        }


        {(this.state.filePath == null || this.state.filePath == '') &&
        <View style={[styles.pdf, {justifyContent: 'center',}]} >
          <Text style={{alignSelf: 'center'}}>No Data/Statement Found.</Text>
        </View>
        }

        {(this.state.filePath != null && this.state.filePath != '') &&

          <PrimeButton
          navigation={this.props.navigation}
          setting={modalBtnSetting}
          btnText="Download"
          onPressButton={() => this.downloadFile()}
          />

        }

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
    // console.log(this.state.selectedDate);
    const {selectedDate, selectedStateId, selectedState} = this.state;
    // console.log(selectedState);

    // const custId = selectedStateId || null;

    const custId = hasAccessRight(this.props.role, VIEW_ALL_STMT)? (selectedStateId || null) : this.props.userId;

    // console.log(custId);
    if (selectedDate) {
      this.setState({ filePath: '' });
      this.updateLoading();
      getStatementByDateAndId(this.state.selectedDate, custId).then(res => {
        console.log(res);
        if (res.data) {
          let path = res.data;
          if (path.indexOf('http://') < 0) {
            path = 'http://' + path;
          }
          this.setState({filePath: path}, () => this.updateLoading());
        } else {
          Toast.show({
            text: 'No Statement found!', buttonText: 'Okay', type: 'warning', style: { backgroundColor: colors.lightGray }, textStyle: { color: colors.black },
            buttonTextStyle: { color: colors.black },
          });
        }
      });
    }

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
    // console.log('isCloseToBottom', layoutMeasurement.height + contentOffset.y
    //   >= contentSize.height - 50);
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - 50;
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
        <View style={CommonStyles.modalFooter}>
          <Form>
            <TextInput
              inputHeight={inputHeight}
              itemStyles={{marginTop: 0 }}
              onChangeText={(text) =>
                this.handleKeywordChange(text)
              }
              label="Keyword"
            />
          </Form>
        </View>
        <ScrollView style={CommonStyles.modalBody} onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.addListOfCustomers();
          }
        }}>
          {this.state.customersListDisplay.map((item) => (
            <TouchableHighlight
              key={item.name}
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
            onPressButton={() => {
              this.setState({ customersListDisplay: this.state.customersList });
              this.customerListCurrPage = 2;
              this.toggleModal(false);
            }}
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
      let mthDate = (newDate.getMonth() + 1) < 10? `0${newDate.getMonth() + 1}`:`${newDate.getMonth() + 1}`;
      this.setState({selectedDate: `${newDate.getDate()}-${mthDate}-${newDate.getFullYear()}`});
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
              {
                hasAccessRight(this.props.role, VIEW_ALL_STMT) && (
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
                )
              }
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
    userId: state.loginReducer.customerId,
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
