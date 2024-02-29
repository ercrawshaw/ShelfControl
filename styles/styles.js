import { Platform, StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const maxWidth = screenWidth * 0.9;
const maxHeight = screenHeight * 0.6;

export default styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#42273B",
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
    color: "#fff",
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
    backgroundColor: "#42273B",
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
    color: "#fff",
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
    borderColor: "#42273B",
  },
  filledPressButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  bottomButton: {
    marginTop: "5%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 20,
    minWidth: 350,
    backgroundColor: "#42273B",
  },
  bottomButtonOutline: {
    borderWidth: 2,
    borderColor: "#42273B",
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
    color: "#333",
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
    width: 120,
    height: 120,
    borderRadius: 80,
    marginRight: 10,
    marginLeft: 5,
    // borderColor: "#42273B",
    // borderWidth: 3,
  },
  profileHeaderTextContainer: {
    flex: 1,
    marginTop: 20,
  },
  profileUsername: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
  },
  PPFriendStatus: {
    borderRadius: 50,
    backgroundColor: "#42273B",
    padding: 10,
  },
  pendingText: {
    fontSize: 14,
  },
  buttonViewProfile: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  PUHeader: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  PUScrollView: {
    marginBottom: 140,
  },
  PPbutton: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  PPbuttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
  },
  PPFriendRequestButton: {
    borderBlockColor: "#42273B",
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
    color: "#42273B",
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
    borderColor: "#42273B",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 15,
  },
  userUsername: {
    fontSize: 20,
    fontWeight: "bold",
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
  },
  UPcontainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  UPText: {
    ...Platform.select({
      ios: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#42273B",
        marginRight: 10,
      },
      android: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#42273B",
        marginRight: -65,
      },
    }),
  },
  fullNameContainer: {
    ...Platform.select({
      ios: {
        flexDirection: "row",
        marginTop: 40,
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
        color: "#42273B",
      },
    }),
  },
  contactText: {
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      android: {
        fontSize: 15,
        color: "#42273B",
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
  },
  rowContainer: {
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 150,
  },
  passwordButton: {
    borderBlockColor: "#42273B",
    borderWidth: 2,
    width: 300,
  },
  editingButton: {
    backgroundColor: "#42273B",
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
        borderWidth: 2,
        // borderBlockColor: 'black',
        margin: 3,
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
        borderWidth: 2,
        margin: 3,
      },
      android: {
        marginRight: 10,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: "#42273B",
        width: "70%",
      },
    }),
  },
  editableLN: {
    ...Platform.select({
      ios: {
        borderWidth: 2,
        margin: 3,
      },
      android: {
        marginTop: 10,
        marginRight: 0,
        paddingRight: 0,
        paddingLeft: 5,
        borderWidth: 2,
        borderColor: "#42273B",
        width: "70%",
      },
    }),
  },
  editingButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
  editingPicButton: {
    // borderBlockColor: 'black',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  editingText: {
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    width: 300,
  },
  deleteText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "#42273B",
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
    backgroundColor: "#42273B",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  ANbutton: {
    backgroundColor: "#42273B",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonCatalogueText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonFriendText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 19,
  },
  NCbuttonText: {
    color: "#42273B",
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
      },
      android: {
        fontSize: 30,
        height: 70,
        paddingVertical: 8,
        paddingHorizontal: 70,
        marginTop: 80,
        width: "90%",
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
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  buttonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
    padding: 5,
    textAlign: "center",
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
  },
  SBauthorInfo: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
  },
  SBsynopsisInfo: {
    marginHorizontal: 25,
    marginBottom: 100,
    lineHeight: 25,
    fontSize: 15,
    textAlign: "center",
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
  SUcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
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
    backgroundColor: "#42273B",
  },
  FRButtonContainer: {
    flexDirection: "row",
  },
  FRButtonText: {
    color: "white",
    fontWeight: "700",
  },
  FRButton: {
    backgroundColor: "#42273B",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  FRdeclineButton: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  FRdeclineButtonText: {
    color: "#42273B",
    fontWeight: "700",
  },
  FPbutton: {
    backgroundColor: "#42273B",
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
  },
  MSButton: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    backgroundColor: "#42273B",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  MSButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  MSFormContainer: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },

  MSscrollContainer: {
    marginTop: 10,
  },
  MSText: {
    color: "#42273B",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  bookFormComponent: {
    color: "#42273B",
  },
  bookFormButton: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    backgroundColor: "#42273B",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  bookFormButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  bookFormButtonCheck: {
    backgroundColor: "#42273B",
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
    borderBlockColor: "#42273B",
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
    height: 40,
    justifyContent: "center",
    width: 100,
  },
  editButton: {
    borderWidth: 2,
    borderBlockColor: "#42273B",
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
    width: "70%",
    fontWeight: "600",
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
    color: "#42273B",
    fontWeight: "700",
    fontSize: 25,
  },
  scannerBookcardText: {
    color: "#42273B",
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
    color: "white",
    textAlign: "center",
    fontSize: 110,
  },
  scannerInputContainer: {
    width: "80%",
  },
  buttonBackScanner: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 60,
  },
  scannerInput: {
    backgroundColor: "white",
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
    backgroundColor: "#42273B",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  scannerButtonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  scannerButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  scannerButtonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  scannerCameraContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});
