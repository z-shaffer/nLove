import React, {useState, useEffect} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import 'react-native-gesture-handler';

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import Like from '../../../assets/images/like.png';
import Dislike from '../../../assets/images/dislike.png';

const ROTATION = 60;
const SWIPE_DISTANCE_MODIFIER = 0.5;
const SWIPE_INDICATOR_MODIFIER = 10;

const AnimatedStack = props => {
  const {data, renderItem} = props;
  // Index of users in the stack
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  // Reference to profile of users in the stack
  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];
  // Calculate screen dimensions for animations
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  // Current X position of top card on stack -- zero by default.
  const translateX = useSharedValue(0);
  //
  // ** Derived Values ** //
  //
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
  //
  // ** Animation Styles ** //
  //
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
  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [20, hiddenTranslateX / SWIPE_INDICATOR_MODIFIER],
      [0, 1],
    ),
  }));
  const dislikeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-20, -hiddenTranslateX / SWIPE_INDICATOR_MODIFIER],
      [0, 1],
    ),
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
          // Callback updates the current index
          hiddenTranslateX * Math.sign(event.velocityX),
          {damping: 10, stiffness: 120, mass: 0.1, duration: 500}, // Custom animation configuration
          () => runOnJS(setCurrentIndex)(currentIndex + 1),
        );
      }
      console.warn('Touch ended');
    },
  });

  useEffect(() => {
    // On current index update: Reset X position variable and point to the index of the next card
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <View style={styles.root}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile})}
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[styles.like, likeStyle]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Dislike}
              style={[styles.dislike, dislikeStyle]}
              resizeMode="contain"
            />
            {renderItem({item: currentProfile})}
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    left: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  dislike: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
});

export default AnimatedStack;
