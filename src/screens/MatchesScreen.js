import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Messages from '../components/Messages';

import {getCurrentUser} from 'aws-amplify/auth';
import {DataStore} from 'aws-amplify/datastore';
import {User, Match} from '../models';

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      getCurrentUser().then(userInfo => {
        DataStore.query(User, u => u.sub.eq(userInfo.userId)).then(
          async dbUsers => {
            if (!dbUsers || !dbUsers.length) {
              return;
            }
            setMe(dbUsers[0]);
          },
        );
      });
    };
    fetchCurrentUser();
  }, []);

  //useEffect(() => fetchCurrentUser(), []);

  useEffect(() => {
    if (!me) {
      return;
    }
    const fetchMatches = async () => {
      const fetchMatch = async matchId => {
        const dbUsers = await DataStore.query(User, u => u.sub.eq(matchId));
        return dbUsers[0];
      };

      const dbMatches = await DataStore.query(Match, m =>
        m.and(m => [
          m.isMatch.eq(true),
          m.or(m => [m.User1ID.eq(me.sub), m.User2ID.eq(me.sub)]),
        ]),
      );
      const fetchedMatches = await Promise.all(
        dbMatches.map(async match => {
          const userId =
            match.User1ID === me.sub ? match.User2ID : match.User1ID;
          return await fetchMatch(userId);
        }),
      );
      setMatches(fetchedMatches);
      setIsLoading(false);
    };
    fetchMatches();
  }, [me]);

  useEffect(() => {
    const subscription = DataStore.observe(Match).subscribe(msg => {
      if (msg.model === 'Match' && msg.opType === 'UPDATE') {
        const newMatch = msg.element;
        if (
          newMatch.isMatch &&
          (newMatch.User1ID === me.id || newMatch.User2ID === me.id)
        ) {
          Alert.alert('You have a new match!');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [me]);

  /* This was code used to access the user fields via the match objects but could not get it to work

  const updateMatch = async match => {
    if (match.User1ID === me.sub) {
      try {
        const matchUser = await fetchMatch(match.User2ID);
        console.log('SAVING');
        await DataStore.save(
          Match.copyOf(match, updated => {
            updated.User1 = me;
            updated.User2 = matchUser;
          }),
        );
        console.log('Match updated successfully!');
      } catch (error) {
        console.error('Error updating match:', error);
      }
    } else {
      try {
        const matchUser = await fetchMatch(match.User2ID);
        console.log('SAVING');
        await DataStore.save(
          Match.copyOf(match, updated => {
            updated.User1 = matchUser;
            updated.User2 = me;
          }),
        );
        console.log('Match updated successfully!');
      } catch (error) {
        console.error('Error updating match:', error);
      }
    }
  };

  const pullMatch = async match => {
    return await match.User2;
  };*/

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {(() => {
          if (isLoading) {
            return <ActivityIndicator />;
          } else if (!matches || matches.length === 0) {
            return (
              <>
                <Text style={{color: 'white', fontSize: 72, paddingTop: '10%'}}>
                  You have no matches.
                </Text>
                <Text style={{color: 'white', fontSize: 72, paddingTop: '15%'}}>
                  Start swiping!
                </Text>
              </>
            );
          } else {
            return (
              <>
                <View style={styles.match}>
                  {matches.map(match => (
                    <View style={styles.user} key={match.id}>
                      <Image
                        source={{uri: match.images}}
                        style={styles.image}
                      />
                    </View>
                  ))}
                </View>
                <Messages />
              </>
            );
          }
        })()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#7e57c2',
    bottom: 15,
  },
  container: {},
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  match: {
    width: 65,
    height: 65,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
  },
  newUser: {
    width: 65,
    height: 65,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default MatchesScreen;
