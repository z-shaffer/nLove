import React, {useState} from 'react';
import UserCard from './src/components/UserCard/';
import users from './assets/data/users';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_DISTANCE_MODIFIER = 0.5;

const App = () => {
  // Index of users in the stack
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  // Reference to profile of users in the stack
  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];
  // Calculate screen dimensions for animations
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  // Current X position of top card on stack -- zero by default.
  const translateX = useSharedValue(0);
  // Interpolation for scale of next card when swiping
  const scale = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.8, 1],
    ),
  );
  // Interpolation for opacity of next card when swiping
  const opacity = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  );
  // Interpolation for rotation of current card when swiping
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );
  // Animation style for current card
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));
  // Animation style for next card
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: opacity.value,
  }));
  // Gesture handler for swiping on current card
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      // Store starting value as a reference point
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      console.warn('Touch x: ', event.translationX);
    },
    onEnd: event => {
      // Absolute value required due to left swipes having a negative value
      if (Math.abs(translateX.value) < SWIPE_DISTANCE_MODIFIER * screenWidth) {
        translateX.value = withSpring(0);
      } else {
        // Send the card off the screen
        translateX.value = withSpring(
          // Determines which way to send the card based on which way the user swiped
          hiddenTranslateX * Math.sign(event.velocityX),
        );
      }
      console.warn('Touch ended');
    },
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.pageContainer}>
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <UserCard user={nextProfile} />
          </Animated.View>
        </View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <UserCard user={currentProfile} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedCard: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
