import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#42273B',
        height: 60,
        elevation: 3,
        shadowColor: '#000',
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
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bigButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex',
        alignItems: 'center',
        margin: 20,
        marginTop: '25%',
    },
    bigButton: {
        margin: 10,
        backgroundColor: '#42273B',
        paddingVertical: 45,
        paddingHorizontal: 25,
        borderRadius: 30, 
        elevation: 4, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    bigButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filledPressButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginBottom: 10,
        minWidth: 300,
    },
    filledPressButtonOutline: {
        borderWidth: 2,
        borderColor: '#42273B', 
    },
    filledPressButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    bottomButton: {
        marginTop: '5%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 14,
        borderRadius: 20,
        minWidth: 350,
        backgroundColor: '#42273B',
    },
    bottomButtonOutline: {
        borderWidth: 2,
        borderColor: '#42273B', 
    },
    bottomButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    scrollView: {
        marginTop: 20,
        width: "100%",
    },



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
        backgroundColor: '#F8F9FA', // Light gray
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    NCbuttonText: {
        color: "#42273B",
        fontWeight: "700",
        fontSize: 16,
      },
    
    UPcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#42273B",
    },
    profileContainer: {
        width: "80%",
    },
    profileText: {
        backgroundColor: "white",
        color: "#42273B",
        marginTop: 20,
        fontWeight: "700",
        fontSize: 16,
        padding: 10,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 5,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    NCbuttonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
      },
    UPbutton: {
        backgroundColor: "#42273B",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    SCbutton: {
        backgroundColor: "#42273B",
        width: "90%",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },

    buttonOutlineText: {
        color: "#42273B",
        fontWeight: "700",
        fontSize: 16,
    },
    image:{ 
        width: 300,
        height: 300,
        alignSelf:'center',
        marginTop:10
    },
    SBimage: {
        width: 200,
        height: 300,
      },
    detailsContainer: {
        alignItems: 'center',
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
        overflow: 'hidden',
        },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333', // Dark gray
        },
    author: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
        color: '#555', // Medium gray
        },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#777', // Light gray
        },
    Carouselcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
    item: {
        width: 100,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        },
    CarouselTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        },
    CarouselAuthor: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 5,
        },
    body: {
        fontSize: 14,
        },
    CarouselImage: {
        width: 100,
        height: 200,
        resizeMode: 'cover',
        },
})