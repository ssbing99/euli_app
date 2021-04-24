/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';
import PrimeButton from '../elements/PrimeButton';
import { DatePicker, Form, Icon } from 'native-base';

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
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { CUSTOMERS } from '../static/data';
import { DataTable } from 'react-native-paper';
import { getInventoryItem } from '../api/methods/inventoryItem';
import { hasAccessRight } from '../store/accessRight';
import { VIEW_ALL_CUSTOMER } from '../config/access';

const itemsPerPage = 10;

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isLoading: false,
      isChecked: false,
      modalVisible: false,
      selectedState: 'Item ID',
      isSelectedState: false,
      showSearchModal: false,
      historyList: [],
      page: 0,
      itemIdsList: [],
      itemidsListDisplay: [],
      itemIdsListPage: [],
      filteredList: [],
      filteredDataCount: 0,
    };

    this.itemIdListInit = 30;
    this.itemIdListCurrPage = 2;
  }

  componentDidMount () {
    console.log('did mount');

    this.getInventoryItem();

  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getInventoryItem = () => {
    try {
      this.updateLoading();
      getInventoryItem().then(res => {
        // console.log(res);
        if (res.data) {
          let itemIds = [];
          let itemIdsPage = [];
          let cnt = 0;
          let dataLength = res.data.length;

          const resData = res.data.sort((da,db) => {
            if(da.Id.toLowerCase() < db.Id.toLowerCase()) return -1;
            if(da.Id.toLowerCase() > db.Id.toLowerCase()) return 1;
            return 0;
          }).filter(data => data.Id != '');

          // update length
          dataLength = resData.length;

          resData.map(data => {
            if(data.Id) {
              if (itemIds.indexOf({id: data.Id, name: data.Id}) == -1) {
                itemIds.push({id: data.Id, name: data.Id});
              }

              if (cnt <= 30 && itemIdsPage.indexOf({id: data.Id, name: data.Id}) == -1) {
                itemIdsPage.push({id: data.Id, name: data.Id});
                cnt++;
              }
            }
          });

          const result = new Array(Math.ceil(resData.length / itemsPerPage)).fill().map(_ => resData.splice(0, itemsPerPage));
          const resultItemId = new Array(Math.ceil(itemIds.length / this.itemIdListInit )).fill().map(_ => itemIds.splice(0, this.itemIdListInit));
          this.setState({historyList: result, filteredList: result, itemIdsList: itemIdsPage, itemidsListDisplay: itemIdsPage, itemIdsListPage: resultItemId, filteredDataCount: dataLength});
          this.updateLoading();
        }else{
          this.setState({historyList: [], filteredList: [], itemIdsList:[], filteredDataCount: 0});
          this.updateLoading();
        }
      });
    } catch (e) {
      console.log(e);
      this.updateLoading();

    }
  };

  filterSelectedList = () => {

    const {historyList, selectedState} = this.state;

    if (historyList && historyList.length > 0) {
      let rows = [];
      let result = [];
      let filteredDataCount = 0;

      historyList.forEach(hist => {
        hist.forEach((h) => {

          let addable = true;

          if(selectedState !== 'Item ID') {
            if (addable && selectedState) {
              if (selectedState !== h.Id) {
                addable = false;
              }
            }
          }

          if (addable) {
            rows.push(h);
          }
        });
      });

      if(rows && rows.length > 0){
        filteredDataCount = rows.length;
        result = new Array(Math.ceil(rows.length / itemsPerPage)).fill().map(_ => rows.splice(0, itemsPerPage));
      }

      this.setState({
        filteredList: result,
        page: 0,
        filteredDataCount: filteredDataCount
      });

    }

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });

  }

  addListOfIds = () => {
    //TODO: Need to clean up on close

    const { itemIdsListPage, itemidsListDisplay } = this.state;

    let newArr = [];

    if(this.itemIdListCurrPage <= itemIdsListPage.length) {

      for (let i = 0; i < this.itemIdListCurrPage; i++) {
        newArr = [...newArr, ...itemIdsListPage[i]];
      }

      // console.log('result', newArr);
      this.setState({itemidsListDisplay: newArr});

      this.itemIdListCurrPage += 1;
    }
  }

  renderRow = () => {

    const {filteredList, page, filteredDataCount} = this.state;

    let defaultRow = (<DataTable.Row>
      <DataTable.Cell style={{flex: 1}}>Data Not Found !</DataTable.Cell>
    </DataTable.Row>);

    if (filteredList && filteredList.length > 0) {
      let rows = [];

      if (page < filteredList.length) {
        let hist = filteredList[page];
        let ii= 0;
        hist.forEach((i) => {

          rows.push(
            <DataTable.Row key={ii++}>
              <DataTable.Cell>{i.Id}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                {i.Name}
              </DataTable.Cell>
              <DataTable.Cell numeric>{i.OHQ}</DataTable.Cell>
            </DataTable.Row>
          );
        });
      }

      if (rows && rows.length > 0) {
        return rows;
      } else {
        return defaultRow;

      }

    } else {
      return defaultRow;
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

    const {page, filteredList, filteredDataCount} = this.state;
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="INVENTORY"
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
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item ID</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Desc 1</DataTable.Title>
              <DataTable.Title numeric>OHQ</DataTable.Title>
            </DataTable.Header>

            {this.renderRow()}

            {/*<DataTable.Row>*/}
            {/*  <DataTable.Cell>OF60-34</DataTable.Cell>*/}
            {/*  <DataTable.Cell style={{ flex: 3 }}>*/}
            {/*    CVC Oxford Colour 34, 60 inches Width*/}
            {/*  </DataTable.Cell>*/}
            {/*  <DataTable.Cell numeric>4</DataTable.Cell>*/}
            {/*</DataTable.Row>*/}

            {/*<DataTable.Row>*/}
            {/*  <DataTable.Cell>OF60-34</DataTable.Cell>*/}
            {/*  <DataTable.Cell style={{ flex: 3 }}>*/}
            {/*    CVC Oxford Colour 34, 60 inches Width*/}
            {/*  </DataTable.Cell>*/}
            {/*  <DataTable.Cell numeric>4</DataTable.Cell>*/}
            {/*</DataTable.Row>*/}

            {filteredList.length > 0 &&
            <DataTable.Pagination
              page={page}
              numberOfPages={filteredList.length}
              onPageChange={(page) => {
                this.setState({page: page});
                // console.log(page);
              }}
              label={`${from + 1}-${to} of ${filteredDataCount}`}
            />
            }
          </DataTable>
        </ScrollView>

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
              itemidsListDisplay: this.state.itemIdsList,
              modalVisible: false,
            });
          }}
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
  toggleModal (visible) {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      modalVisible: visible,
    });
  }

  _searchModal () {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      selectedDate: null,
      selectedState: 'Item ID',
    });
  }

  _searchSubmit () {
    this.filterSelectedList();
  }


  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
    // console.log('isCloseToBottom', layoutMeasurement.height + contentOffset.y
    //   >= contentSize.height - 50);
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - 50;
  }

  renderBody () {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody} onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.addListOfIds();
          }
        }}>
          {this.state.itemidsListDisplay.map((item) => (
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
            underlayColor={colors.red}
            btnText="Close"
            onPressButton={() => {
              this.setState({ itemidsListDisplay: this.state.itemIdsList });
              this.itemIdListCurrPage = 2;
              this.toggleModal(false);
              }
            }
          />
        </View>
      </View>
    );
  }

  renderSearchBody () {
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
  selectItem (id, state) {
    this.setState({
      selectedState: state,
      isSelectedState: true,
    });
  }
}

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
});

InventoryScreen.propTypes = {
  navigation: PropTypes.any,
};
