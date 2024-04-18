import React from 'react';
import UserCard from './src/components/UserCard/';
import users from './assets/data/users';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const App = () => {
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(() => '20deg');
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
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      console.warn('Touch x: ', event.translationX);
    },
    onEnd: () => {
      //if (translateX.value <= -200 )
      console.warn('Touch ended');
    },
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.pageContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <UserCard user={users[0]} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
