import * as React from "react";
import debounce from "lodash/debounce";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animate,
  ImageBackground,
  Animated,
  Picker
} from "react-native";
import {
  fartIndex
} from "./assets/fart-collection/fart-index";
 var Sound= require( 'react-native-sound');

const camPic = require("./assets/imgs/cam.png");
const sophiaPic = require("./assets/imgs/sophia.png");
// const test = require("./assets/fart-collection/2.mp3"); // delete when done
const rilieghPic = require("./assets/imgs/riley.png");
const rotateValue = new Animated.Value(0);
const scaleValue = new Animated.Value(1);
const randomRotateValue = [
  ["0deg", "-45deg", "45deg"],
  ["0deg", "70deg", "-70deg"],
  ["0deg", "-90deg", "90deg"],
  ["0deg", "30deg", "30deg"],
  ["0deg", "-120deg", "120deg"]
];

const App = props => {
  const fartSoundArray = [];

  const previousRotateArrayIndex = React.useRef();
  const previousFartArrayIndex = React.useRef();
  const [currentTurdPic, setCurrentTurdPic] = React.useState(camPic);
  const [rotateState, setRotateState] = React.useState({
    outputRange: ["0deg", "90deg", "-180deg"]
  });
  const createAnimateSettingsObject = (value, duration) => {
    return { toValue: value, duration: duration };
  };
  // var whoosh = new Sound(fartIndex[randomFartIndexNumber].fileName);
  React.useEffect(()=>{
    
    fartSoundArray.push(new Sound('a.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('b.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('c.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('d.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('e.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('f.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('g.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('h.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('i.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('j.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('k.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('l.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('m.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('n.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('o.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('p.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('q.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('r.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('s.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('t.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('u.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('v.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('w.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('x.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('y.mp3',Sound.MAIN_BUNDLE));
    fartSoundArray.push(new Sound('z.mp3',Sound.MAIN_BUNDLE));
    
  },[]);
  
  const imagePressed = async () => {
   

 
    // use random number between 1 and 26 to select the fart noise and associated animation delay
    // var randomFartIndexNumber = Math.floor(Math.random() * 26) + 1;
    var randomFartIndexNumber = Math.floor(Math.random() * 26) + 1;
    while (randomFartIndexNumber === previousFartArrayIndex.current) {
      randomFartIndexNumber = Math.floor(Math.random() * 26) + 1;
    }
    previousFartArrayIndex.current = randomFartIndexNumber;

    
  


    // random index for rotate animation rotation
    let randomRotateNumber = Math.floor(Math.random() * 4) + 1;
    while (randomRotateNumber === previousRotateArrayIndex.current) {
      randomRotateNumber = Math.floor(Math.random() * 4) + 1;
    }
    previousRotateArrayIndex.current = randomRotateNumber;
    setRotateState({ outputRange: randomRotateValue[randomRotateNumber] });

    setTimeout(() => {
      fartSoundArray[randomFartIndexNumber-1].play((success) => {
               /* ... */
      });
 }, 100);
  
    setTimeout(() => {
  
 
      setTimeout(() => {
        fartSoundArray[randomFartIndexNumber-1].play((success) => {
          /* ... */
 });
     }, 100);
 }, 100);

    Animated.parallel([
      Animated.timing(
        rotateValue,
        createAnimateSettingsObject(
          1,
          fartIndex[randomFartIndexNumber-1].duration
        )
      ),
      Animated.timing(
        scaleValue,
        createAnimateSettingsObject(
          2,
          fartIndex[randomFartIndexNumber-1].duration
        )
      )
    ]).start(() => {
      Animated.parallel([
        Animated.timing(
          rotateValue,
          createAnimateSettingsObject(
            0,
            fartIndex[randomFartIndexNumber-1].duration
          )
        ),
        Animated.timing(
          scaleValue,
          createAnimateSettingsObject(
            1,
            fartIndex[randomFartIndexNumber-1].duration
          )
        )
      ]).start();
    });
  };
  const handler = React.useCallback(
    debounce(imagePressed, 1000, {
      leading: true,
      trailing: false,
      maxWait: 1000
    }),
    []
  );
  const rotateStyle = {
    transform: [
      {
        rotate: rotateValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: rotateState.outputRange
        })
      }
    ]
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background, { flex: 1 }]}
        source={require("./assets/imgs/poopbg.jpg")}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={handler}

          // disabled={isBEnabled.current}
          >
            <Animated.View style={[styles.scaleStyle]}>
              <Animated.View style={rotateStyle}>
                <Image style={styles.logo} source={currentTurdPic} />
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={[styles.selectTurdArea]}>
            <Text
              style={{ color: "white", textAlign: "center", marginBottom: 20 }}
            >
              Choose your Turd
            </Text>
            <View style={{ backgroundColor: "white" }}>
              <Picker
               mode={"dialog"}
                style={{ width: 200 }}
                selectedValue={currentTurdPic}
                onValueChange={value => {
                  setCurrentTurdPic(value);
                }}
              >
                <Picker.Item label="Cameron" value={camPic} />
                <Picker.Item label="Sophia" value={sophiaPic} />
                <Picker.Item label="Riliegh" value={rilieghPic} />
              </Picker>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  selectTurdArea: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#895525"
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(255,255,255,.5)",
    width: "100%"
  },
  scaleStyle: {
    transform: [
      {
        scale: scaleValue
      }
    ]
  },
  background: {
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flex: 1,


  },
  logo: {}
});

export default App;