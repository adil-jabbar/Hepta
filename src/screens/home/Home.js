import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {locationPermission, getCurrentLocation} from '../../helper';
import Geolocation from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '../../../googleKey';
import MapTheme from './MapTheme';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  width,
} from '../../constants';
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
  Icon,
  IconType,
  MyTouchableOpacity,
} from '../../components';
import Modal from 'react-native-modal'; // Import react-native-modal
import { dashboardAction, orderMappingAction } from '../../redux/slices/profile';
import { useDispatch, useSelector } from 'react-redux';
import { offersAction, orderDeliverAction, orderPendingAction, orderPendingCancel, riderHistoryAction } from '../../redux/slices';
import moment from 'moment';

export default function Home(props) {
  const ref = useRef();
  const route = useRoute(); // Access the route params
  const [isSelected, setisSelected] = useState(false);
  const [isRideStart, setisRideStart] = useState(false);
  const [isDelivered, setisDelivered] = useState(false);
  const [region, setRegion] = useState()
  const dispatcher = useDispatch();
  const {dashboard} = useSelector(state => state.profile);
  const {mapping} = useSelector(state => state.profile);
  const totalCount = dashboard?.deliverOrder + dashboard?.pendingOrder + dashboard?.returnOrder;
  const dispatch = useDispatch();
  const today = moment().format('YYYY-MM-DD');
  useEffect(() => {
    fetchUserLocation();
    dispatch(orderMappingAction())
    dispatch(dashboardAction())
    dispatch(orderPendingAction({order_status:'1'}))
    dispatch(orderDeliverAction({order_status:'4'}))
    dispatch(orderPendingCancel({order_status:'5'}))
    dispatch(riderHistoryAction({date:today}))
  }, []);


  // const getOrderPending = () => {
  //   const postData = {
  //     order_status: '1',
  //   };
  //   dispatcher(orderPendingAction(postData))
  //     .unwrap()
  //     .then(response => {
  //       // setisLoading(false);
  //       console.log('PENDINGS', response);
  //     })
  //     .catch(err => {
  //       // setisLoading(false);
  //       console.log(err);
  //       // utils.errorAlert(err?.message);
  //     });
  // };
 


  const locations = [
    { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
    { latitude: 36.1699, longitude: -115.1398 }, // Las Vegas
    { latitude: 40.7128, longitude: -74.0060 }, // New York City
  ];


  const coordinates = locations.map(location => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));


  // useEffect(() => {
  //   if (route.params?.sendTrue) {
  //     setisSelected(route.params?.sendTrue);
  //     console.log('Received sendTrue parameter:', route.params.sendTrue);
  //   }
  // }, [route.params?.sendTrue]); // Dependency array ensures effect is called when `sendTrue` changes



  useEffect(() => {
    if (route.params?.isSelected !== undefined) {
      setisSelected(route.params.isSelected);
      console.log('Received isSelected parameter:', route.params.isSelected);
    }
  }, [route.params?.isSelected]);


  const [isModalVisible, setIsModalVisible] = useState(false); // Manage modal visibility

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();

  const [initRegion, setInitRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  const [currentLocation, setCurrentLocation] = useState(null);
  const [showsUserLocation, setShowsUserLocation] = useState(true);

const [mappingView, setmappingView] = useState(false)

  Geolocation.init(GOOGLE_API_KEY);

  const fetchUserLocation = async () => {
    try {
      // Assuming locationPermission() checks for permission (you should implement it)
      const locPermissionGranted = await locationPermission();
      if (locPermissionGranted) {
        const { latitude, longitude } = await getCurrentLocation(); // Your function to get current location
        setCurrentLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        console.error('Location permission denied');
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const handleRegionChangeComplete = (newRegion) => {
    // Only update region state when map drag is complete
    setInitRegion(newRegion);
  };


  const mapRef = useRef(null);

  const SquareButton = ({title, count}) => {
    return (
      <View
        style={[
          {
            width: width * 0.4,
            // flex: 1,
            // height: width * 0.3,
            padding: SIZES.fifteen,
            backgroundColor: COLORS.white,
            // paddingVertical: SIZES.ten,
            borderRadius: SIZES.fifteen,
            marginVertical: SIZES.five + 2,
            // paddingHorizontal: SIZES.twentyFive,
          },
        ]}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>{title}</Text>
        <Text
          style={[
            {
              fontSize: SIZES.twenty * 2.2,
              color: COLORS.primary,
              textAlign: 'right',
              fontFamily: FONTFAMILY.SemiBold,
            },
          ]}>
          {count}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // customMapStyle={MapTheme}
        region={initRegion}
        showsUserLocation={true}
        onRegionChangeComplete={handleRegionChangeComplete}

        mapPadding={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 150,
        }}
        showsMyLocationButton={true}
        >
        {showsUserLocation && currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            description="This is where you are">
            <Image source={IMAGES.userAvatar} style={styles.avatar} />
          </Marker>
        )}


{locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`Location ${index + 1}`}
            description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          />
        ))}

        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          strokeWidth={4}
        />

      </MapView>

      <CustomHeader showMoreIcon />


      {isSelected && (
        <View style={styles.OrderDetail}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.twenty,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                borderBottomWidth: 2,
                borderColor: COLORS.white,
                paddingBottom: SIZES.ten + 2,
              }}>
              <View style={{}}>
                <Text
                  style={[FONTS.mediumFont16, {color: COLORS.whiteOpacity}]}>
                  Deliver To:{' '}
                </Text>
                <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>
                  Daniel A.
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    backgroundColor: '#353A50',
                    width: width * 0.11,
                    height: width * 0.11,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.ten,
                    marginRight: SIZES.ten,
                  }}>
                  <Icon
                    name="call-outline"
                    type={IconType.Ionicons}
                    size={SIZES.twentyFive * 1.1}
                    style={{
                      color: COLORS.white,
                    }}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#353A50',
                    // width: SIZES.twentyFive ,
                    width: width * 0.11,
                    height: width * 0.11,
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: SIZES.ten,
                  }}>
                  <Icon
                    name="mail-outline"
                    type={IconType.Ionicons}
                    size={SIZES.twentyFive * 1.2}
                    style={{
                      color: COLORS.white,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: SIZES.fifteen}}>
            <Text
              style={[
                FONTS.boldFont18,
                {color: COLORS.white, marginBottom: SIZES.five},
              ]}>
              Delivery Address
            </Text>
            <View style={styles.locationContainer}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="location-sharp"
                  type={IconType.Ionicons}
                  style={{
                    color: COLORS.blackWithOpacity,
                    fontSize: SIZES.twentyFive,
                  }}
                />
                <Text style={[FONTS.mediumFont12, styles.addressText]}>
                  Brandon T Link, Shepard Dr, California, USA
                </Text>
              </View>
              <View
                style={{
                  flex: 1,

                  alignItems: 'flex-end',
                }}>
                <Icon
                  name="location-arrow"
                  type={IconType.FontAwesome5}
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.twentyFiveWidth,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MyTouchableOpacity
              onPress={() => {
                if (!isRideStart) {
                  setisRideStart(true); // Start the ride
                } else {
                  setisSelected(false); // Mark as delivered
                  setisDelivered(true);
                }
              }}
              style={[styles.startButton, {backgroundColor: COLORS.white}]}>
              <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
                {!isRideStart ? 'Start' : 'Mark as Delivered'}
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => setisSelected(false)}
              style={styles.startButton}>
              <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                {!isRideStart ? 'Back' : 'Cancel'}
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      )}

      {!isModalVisible && isSelected == false && (
        <TouchableOpacity onPress={toggleModal} style={styles.openModalButton}>
          <Text style={styles.task}>Tasks</Text>
          <Text style={styles.taskNumber}>{totalCount}</Text>
        </TouchableOpacity>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close the modal when tapped outside
        onBackButtonPress={toggleModal} // Close on pressing back button
        animationIn="slideInUp" // Modal in animation (slide up)
        animationOut="slideOutDown" // Modal out animation (slide down)
        backdropColor="rgba(0, 0, 0, 0.3)" // Backdrop color
        backdropOpacity={0.7}
        useNativeDriver={true} // Use native driver for animations
        style={styles.modal} // Additional modal style
      >
        <View style={styles.modalContainer}>
          <View style={styles.SqaureButtonContainer}>
            <SquareButton title={'Today'} count={dashboard?.todayOrder} />
            <SquareButton title={'Pending'} count={dashboard?.pendingOrder} />
          </View>
          <View style={styles.SqaureButtonContainer}>
            <SquareButton title={'Delivered'} count={dashboard?.deliverOrder} />
            <SquareButton title={'Returned'} count={dashboard?.returnOrder} />
          </View>

          <CustomButton
            onPress={() => {
              toggleModal(); 
              setmappingView(true)
              
              //
            }}
            iconType={IconType.Feather}
            iconName={'map'}
            iconColor={COLORS.primary}
            iconSize={SIZES.twentyFive}
            hasIcon
            isCustom
            CustomColor={COLORS.white}
            btnStyle={{
              marginVertical: SIZES.fifteen,
              backgroundColor: COLORS.blackWithOpacity,
            }}
            title={'Enter Map View'}
            titleStyle={{color: COLORS.black, fontFamily: FONTFAMILY.Medium}}
          />
          <CustomButton
            onPress={() => {
              navigation.navigate(SCREENS.Tasks); // Navigate to the 'Tasks' screen
              toggleModal(); //
            }}
            iconType={IconType.FontAwesome5}
            iconName={'list'}
            iconColor={COLORS.primary}
            iconSize={SIZES.twenty + 2}
            hasIcon
            isCustom
            CustomColor={COLORS.white}
            btnStyle={{marginVertical: SIZES.fifteen}}
            title={'Enter List View'}
            titleStyle={{color: COLORS.black, fontFamily: FONTFAMILY.Medium}}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isDelivered}
        onBackdropPress={toggleModal} // Close the modal when tapped outside
        onBackButtonPress={toggleModal} // Close on pressing back button
        animationIn="slideInUp" // Modal in animation (slide up)
        animationOut="slideOutDown" // Modal out animation (slide down)
        backdropColor="rgba(0, 0, 0, 0.3)" // Backdrop color
        backdropOpacity={0.7}
        useNativeDriver={true} // Use native driver for animations
        style={styles.modal} // Additional modal style
      >
        <View style={styles.markContainer}>
          <CustomTextInput
            value={[]}
            label="Amount Received"
            placeholder="Enter Amount"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomTextInput
            value={[]}
            label="Relation with Consignee"
            placeholder="Enter Relation"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomTextInput
            value={[]}
            label="Receiver Name"
            placeholder="Receiver Name"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomTextInput
            value={[]}
            label="CNIC"
            placeholder="Enter CNIC"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomTextInput
            value={[]}
            label="Comment"
            placeholder="Enter Comments"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomTextInput
            multiline
            value={[]}
            label="Signature"
            // placeholder="ents"
            onChangeText={[]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect="false"
            secondaryLabel
            txtInputStyle={{color: COLORS.black}}
          />
          <CustomButton
            onPress={() => {
              setisDelivered(false); //
            }}
            isCustom
            CustomColor={COLORS.white}
            btnStyle={{
              marginVertical: SIZES.fifteen,
              backgroundColor: COLORS.blackWithOpacity,
            }}
            title={'Mark as Delivered'}
            titleStyle={{color: COLORS.black, fontFamily: FONTFAMILY.Medium}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: COLORS.primary,
    width: width * 0.4,
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    borderRadius: SIZES.ten,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: SIZES.twenty,
  },
  addressText: {
    width: width * 0.5,
    color: COLORS.black,
    fontSize: SIZES.fourteen,
    marginLeft: SIZES.five,
  },
  locationContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.five,
    // justifyContent: 'space-around',
  },
  OrderDetail: {
    backgroundColor: COLORS.primary,
    padding: SIZES.twenty,
    borderTopRightRadius: SIZES.twenty,
    borderTopLeftRadius: SIZES.twenty,
    width: width,
    position: 'absolute',
    bottom: 0,

    // paddingHorizontal: SIZES.twentyFiveWidth,
    // alignItems: 'center',
    height: height * 0.35,
  },
  SqaureButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  locationButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: COLORS.appRed,
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  toggleLocationButton: {
    position: 'absolute',
    bottom: 140,
    right: 20,
    backgroundColor: COLORS.appBlue,
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  locationIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white,
  },
  openModalButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.twenty,
    borderRadius: 0,
    width: width,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.twentyFiveWidth,
    alignItems: 'center',
    height: height * 0.13,
  },
  task: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 32,
  },
  taskNumber: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 40,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: COLORS.primaryTransparent,
    padding: SIZES.twenty,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  markContainer: {
    backgroundColor: COLORS.primary,
    padding: SIZES.twenty,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  expandButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskList: {
    marginTop: 10,
    marginBottom: 20,
  },
  taskItem: {
    fontSize: 18,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
