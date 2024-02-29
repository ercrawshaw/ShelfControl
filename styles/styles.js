import { Platform, StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const maxWidth = screenWidth * 0.9;
const maxHeight = screenHeight * 0.6;

const purple = '#42273B';
const pink = '#D7A9B7';
const blue = '#A6B5CB';

export default styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: pink,
    height: 70,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navPressableButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonText: {
    color: purple,
    fontSize: 16,
    fontWeight: "bold",
  },
  SCsearchBar: {
    marginTop: 10,
  },

  bigButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex",
    alignItems: "center",
    margin: 20,
    marginTop: "25%",
  },
  bigButton: {
    margin: 10,
    backgroundColor: pink,
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bigButtonText: {
    color: purple,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  filledPressButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 300,
  },
  filledPressButtonOutline: {
    borderWidth: 2,
    borderColor: pink,
  },
  filledPressButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: pink,
  },
  bottomButton: {
    marginTop: "5%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 20,
    minWidth: 350,
    backgroundColor: pink,
  },
  bottomButtonOutline: {
    borderWidth: 2,
    borderColor: pink,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: purple,
  },
  bottomContainer: {
    marginTop: 1,
    marginBottom: 20,
    alignItems: "center",
  },
  scrollView: {
    marginTop: 20,
    width: "100%",
  },
  loginInputContainer: {
    marginBottom: 1,
    marginTop: 30,
    width: "90%",
  },
  loginInput: {
    borderWidth: 2,
    borderColor: "grey",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "lightgrey",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  smallButtonText: {
    color: "red",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  forgotPasswordButton: {
    margin: 10,
    borderColor: "red",
    borderWidth: 1,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    ...Platform.select({
      ios: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
      },
      android: {
        width: 120,
        height: 120,
        borderRadius: 80,
        marginRight: 10,
        marginLeft: 5,
        marginTop: 10,
      },
    }),
  },
  profileHeaderTextContainer: {
    flex: 1,
    marginTop: 20,
  },
  profileUsername: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: pink,
  },
  PPFriendStatus: {
    borderRadius: 50,
    backgroundColor: pink,
    padding: 10,
  },
  pendingText: {
    fontSize: 14,
  },
  buttonViewProfile: {
    backgroundColor: pink,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  PUHeader: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    color: pink,
  },
  PUScrollView: {
    marginBottom: 140,
  },
  PPbutton: {
    backgroundColor: pink,
    width: "90%",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  PPbuttonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
  },
  PPFriendRequestButton: {
    borderBlockColor: pink,
    borderWidth: 2,
    width: "90%",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  PPFriendRequestButtonText: {
    color: pink,
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "center",
  },
  usersProfileContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "column",
    columnGap: 5,
    flex: 1,
  },
  userProfileItem: {
    marginBottom: 20,
  },
  usersInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    borderBottomWidth: 3,
    borderColor: pink,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 15,
  },
  userUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: pink,
  },
  userShelfer: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
    color: pink,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: pink,
  },
  activityIndicatorView: {
    marginBottom: 20,
  },
  profileText: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    height: 50,
    alignItems: "center",
    marginTop: 60,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  PPSHeader: {
    fontSize: 25,
    fontWeight: "400",
    color: pink,
  },
  UPcontainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    flexDirection: "column",
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  UPText: {
    ...Platform.select({
      ios: {
        fontSize: 30,
        fontWeight: "bold",
        color: pink,
        marginRight: 10,
      },
      android: {
        fontSize: 30,
        fontWeight: "bold",
        color: pink,
        marginRight: -65,
      },
    }),
  },
  fullNameContainer: {
    ...Platform.select({
      ios: {
        flexDirection: "row",
        marginTop: 46,

      },
      android: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "flex-start",
      },
    }),
  },
  LNInput: {
    ...Platform.select({
      android: {
        marginLeft: 15,
      },
    }),
  },
  FNInput: {
    ...Platform.select({
      android: {},
    }),
  },
  UPContactInfo: {
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 10,
        color: pink,
      },
    }),
  },
  contactText: {
    ...Platform.select({
      ios: {
        fontSize: 15,
        color: pink,
      },
      android: {
        fontSize: 15,
        color: pink,
        fontWeight: "600",
      },
    }),
  },
  UPbutton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 250,
  },
  UPtoggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  UPtoggleText: {
    fontWeight: "700",
    paddingBottom: 2,
    color: pink,
  },
  rowContainer: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  UPButtonContainer: {
    flexDirection: "column",
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  UPfilledPressButtonOutline: {
    ...Platform.select({
    ios:{
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 150,
    borderColor: pink,
    }, 
    android:{justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 150,
    borderColor: pink,
  }})
  },
  passwordButton: {
    borderBlockColor: pink,
    borderWidth: 2,
    width: 300,
  },
  editingButton: {
    backgroundColor: pink,
    borderWidth: 2,
    width: 300,
  },
  editable: {
    ...Platform.select({
      ios: {
        borderWidth: 2,
        // borderBlockColor: 'black',
        margin: 3,
      },
      android: {
        borderWidth: 2,
        margin: 3,
        padding: 5,
        width: "55%",
      },
    }),
  },
  fullNameContainerEditable: {
    ...Platform.select({
      ios: {
        borderWidth:1,
        marginTop: 40,
        borderColor: pink,
        flexDirection: 'row',
      },
      android: {
        marginTop: 40,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "70",
        flexWrap: "wrap",
      },
    }),
  },
  editableFN: {
    ...Platform.select({
      ios: {
        //borderWidth: 2,
        margin: 3,
      },
      android: {
        marginRight: 10,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: pink,
        width: "70%",
      },
    }),
  },
  editableLN: {
    ...Platform.select({
      ios: {
        margin: 3,
      },
      android: {
        marginTop: 10,
        marginRight: 0,
        paddingRight: 0,
        paddingLeft: 5,
        borderWidth: 2,
        borderColor: pink,
        width: "70%",
      },
    }),
  },
  editingButtonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
  editingPicButton: {
    // borderBlockColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderColor: pink,
  },
  editingText: {
    textAlign: "center",
    color: pink,
  },
  deleteButton: {
    backgroundColor: blue,
    width: 300,
  },
  deleteText: {
    fontSize: 17,
    fontWeight: "bold",
    color: purple,
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 5,
    padding: 7,
  },
  innerFriendContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
  },
  chatButtonIcon: {},
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NCcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pink,
  },
  SBcontainer: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Light gray
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  logButton: {
    backgroundColor: pink,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  ANbutton: {
    backgroundColor: pink,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: pink,
    borderWidth: 2,
    borderColor: pink,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutline: {
    borderColor: pink,
    borderWidth: 2,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: pink,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonCatalogueTextTitle: {
    color: pink,
    fontWeight: "700",
    fontSize: 19,
    textAlign: "center",
  },
  buttonCatalogueTextAuthor: {
    color: pink,
    fontWeight: "400",
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: "center",
  },
  buttonFriendText: {
    color: pink,
    fontWeight: "700",
    fontSize: 19,
  },
  NCbuttonText: {
    color: pink,
    fontWeight: "500",
    fontSize: 25,
    textAlign: "center",
  },
  
  profileTextInput: {
    ...Platform.select({
      ios: {
        fontSize: 30,
        height: 70,
        paddingVertical: 8,
        paddingHorizontal: 70,
        marginTop: 80,
        backgroundColor: 'white',
        borderRadius: 20,
      },
      android: {
        fontSize: 30,
        height: 70,
        paddingVertical: 8,
        paddingHorizontal: 70,
        marginTop: 80,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
      },
    }),
  },
  NCbuttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  SCbutton: {
    borderColor: pink,
    borderWidth: 2,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  UPimage: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  SBimageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  SBimage: {
    width: 200,
    height: 300,
    marginTop: 10,
    marginBottom: 20,
  },
  SBinfoContainer: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  SBtitleInfo: {
    fontWeight: "bold",
    fontSize: 25,
    color: pink,
  },
  SBauthorInfo: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    color: pink,
  },
  SBsynopsisInfo: {
    marginHorizontal: 25,
    marginBottom: 100,
    lineHeight: 25,
    fontSize: 15,
    textAlign: "center",
    color: pink,
  },
  detailsContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  navBarPosition: {
    marginTop: 20,
  },
  SUcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SUtextinput: {
    backgroundColor: 'lightgrey',
    margin: 5,
    padding: 15,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: purple,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333", // Dark gray
  },
  author: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
    color: "#555", // Medium gray
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#777", // Light gray
  },
  Carouselcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: 100,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  CarouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  CarouselAuthor: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
  },
  CarouselImage: {
    width: 100,
    height: 200,
    resizeMode: "cover",
  },

  //to stick to bottom - as shown on FriendsListScreen
  HScontainer: {
    flex: 1,
  },
  HSmainScreen: {
    flex: 1,
  },
  FLcontainer: {
    flex: 1,
  },
  FLmainScreen: {
    flex: 1,
  },
  FLscrollView: {
    flex: 1,
  },
  FLfooter: {
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  FLfriendContainer: {
    marginBottom: 20,
  },
  FLbottomButton: {
    backgroundColor: pink,
  },
  FRButtonContainer: {
    flexDirection: "row",
  },
  FRButtonText: {
    color: purple,
    fontWeight: "700",
  },
  FRButton: {
    backgroundColor: pink,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  FRdeclineButton: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  FRdeclineButtonText: {
    color: pink,
    fontWeight: "700",
  },
  FPbutton: {
    backgroundColor: pink,
    width: "45%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginRight: 5,
  },
  FRImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  chatImage: {
    width: 50,
    height: 50,
  },
  SCcontainer: {
    flex: 1,
  },
  SCmain: {
    flex: 1,
  },
  SCscrollView: {
    flex: 1,
  },
  SCheaderText: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "800",
    color: pink,
  },
  SCsearchBar: {
    marginTop: 10,
  },
  MSsearchBarContainer: {
    marginTop: 10,
  },
  MSsearchBar: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  MSButton: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    backgroundColor: pink,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  MSButtonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
  },
  MSFormContainer: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
  },
  MSscrollContainer: {
    marginTop: 10,
  },
  MSfooter: {
    position: 'absolute',
    flex:1, 
  },
  MSText: {
    color: pink,
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  bookForm: {
    marginTop: 10,
  },
  bookFormComponent: {
    color: pink,
  },
  bookFormText: {
    color: pink,
    textAlign: 'center',
    marginVertical: 10,
  },
  bookFormButton: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    backgroundColor: pink,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  bookFormButtonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
  },

  bookFormButtonCheck: {
    backgroundColor: pink,
  },

  bookcard: {
    margin: 10,
    flex: 1,
  },
  signoutButtonContainer: {
    position: "absolute",
    right: 30,
    flexDirection: "row",
  },
  signoutButton: {
    borderWidth: 2,
    borderColor: pink,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
    height: 40,
    justifyContent: "center",
    width: 100,
  },
  editButton: {
    borderWidth: 2,
    borderBlockColor: pink,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    height: 40,
    justifyContent: "center",
    right: 30,
    position: "absolute",
  },
  profileInformationContainer: {
    flexDirection: "row",
  },
  UPContainer: {
    marginTop: 30,
  },
  emptyListMsg: {
    textAlign: "center",
    fontWeight: "500",
    color: pink,
    fontStyle: 'italic',
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  scannerBookcard: {
    margin: 10,
    marginBottom: 50,
    width: "80%",
  },
  scannerBookcardTitle: {
    color: pink,
    fontWeight: "700",
    fontSize: 25,
  },
  scannerBookcardText: {
    color: pink,
    fontWeight: "700",
    fontSize: 16,
  },
  scannerBookcardImage: {
    // width: 50,
  },
  scannerCamera: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth,
    maxHeight,
    overflow: "hidden",
  },
  scannerCrosshair: {
    color: purple,
    textAlign: "center",
    fontSize: 110,
  },
  scannerInputContainer: {
    width: "80%",
  },
  buttonBackScanner: {
    backgroundColor: pink,
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 60,
  },
  scannerInput: {
    backgroundColor: purple,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  scannerButtonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  scannerButton: {
    backgroundColor: pink,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  scannerButtonOutline: {
    backgroundColor: purple,
    marginTop: 5,
    borderColor: pink,
    borderWidth: 2,
  },
  scannerButtonText: {
    color: purple,
    fontWeight: "700",
    fontSize: 16,
  },
  scannerButtonOutlineText: {
    color: pink,
    fontWeight: "700",
    fontSize: 16,
  },
  scannerCameraContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});
