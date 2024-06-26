import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator} from 'react-native';

import UserCard from '../components/UserCard';
import AnimatedStack from '../components/AnimatedStack';
import Onboarding from '../components/Onboarding';

import {getCurrentUser} from 'aws-amplify/auth';
import {DataStore} from 'aws-amplify/datastore';
import {User, Match} from '../models';

import Fontisto from 'react-native-vector-icons/Fontisto';

const HomeScreen = ({isUserLoading}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const [me, setMe] = useState(null);

  // Pull in the info of the current user

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      const identityUser = await getCurrentUser();
      const dbUsers = await DataStore.query(User, u =>
        u.sub.eq(identityUser.userId),
      );
      if (!dbUsers || !dbUsers.length) {
        setIsLoading(false);
        return;
      }
      setMe(dbUsers[0]);
    };
    fetchCurrentUser();
  }, []);

  // Pull a filtered list of matches

  useEffect(() => {
    if (!me) {
      return;
    }
    const fetchMatches = async () => {
      const dbMatches = await DataStore.query(Match, m =>
        m.and(m => [
          m.isMatch.eq(true),
          m.or(m => [m.User1ID.eq(me.sub), m.User2ID.eq(me.sub)]),
        ]),
      );
      setMatches(
        dbMatches.map(match =>
          match.User1ID === me.sub ? match.User2ID : match.User1ID,
        ),
      );
    };
    fetchMatches();
  }, [me]);

  // Pull the info of the potential matches of the current user

  useEffect(() => {
    if (isUserLoading || !me || matches === null) {
      return;
    }
    const fetchUsers = async () => {
      let fetchedUsers = await DataStore.query(User, u =>
        u.and(u => [u.gender.eq(me.lookingFor), u.sub.ne(me.sub)]),
      );
      fetchedUsers = fetchedUsers.filter(u => !matches.includes(u.sub));
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    fetchUsers();
  }, [isUserLoading, me, matches]);

  // Logic to declare both users are NOT a match

  const onSwipeLeft = () => {
    if (!currentUser || !me) {
      Alert.alert('An error occurred. Try restarting the app.');
      return;
    }
    console.warn('Swiped left on', currentUser.name);
  };

  // Logic to declare the user likes the potential match being shown to them

  const onSwipeRight = async () => {
    if (!currentUser || !me) {
      Alert.Alert('An error occurred. Try restarting the app.');
      return;
    }
    const myMatches = await DataStore.query(Match, match =>
      match.and(m => [m.User1ID.eq(me.sub), m.User2ID.eq(currentUser.sub)]),
    );
    if (myMatches.length > 0) {
      console.warn('You already swiped right on this user');
      return;
    }
    const theirMatches = await DataStore.query(Match, match =>
      match.and(m => [m.User1ID.eq(currentUser.sub), m.User2ID.eq(me.sub)]),
    );
    if (theirMatches.length > 0) {
      console.warn('New match!');
      const theirMatch = theirMatches[0];
      DataStore.save(
        Match.copyOf(theirMatch, updated => (updated.isMatch = true)),
      );
      return;
    }
    console.warn('Sending match request');
    DataStore.save(
      new Match({
        User1ID: me.sub,
        User2ID: currentUser.sub,
        isMatch: false,
      }),
    );
    console.warn('Swiped right on', currentUser.name);
  };

  return (
    <View style={styles.pageContainer}>
      {(() => {
        if (isLoading) {
          return <ActivityIndicator />;
        } else if (!me) {
          return <Onboarding setMe={setMe} />;
        } else {
          return (
            <>
              <AnimatedStack
                data={users}
                renderItem={({item}) => <UserCard user={item} />}
                setCurrentUser={setCurrentUser}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
              <View style={styles.icons}>
                <View style={styles.button}>
                  <Fontisto name="frowning" size={40} color="#FF6B6B" />
                </View>
                <View style={styles.button}>
                  <Fontisto name="undo" size={40} color="#FFD166" />
                </View>
                <View style={styles.button}>
                  <Fontisto name="heart-eyes" size={40} color="#00b894" />
                </View>
              </View>
            </>
          );
        }
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#7e57c2',
    bottom: 15,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '8%',
    padding: 0,
    bottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d4db1',
    paddingLeft: 2,
    borderRadius: 50,
  },
});

export default HomeScreen;
