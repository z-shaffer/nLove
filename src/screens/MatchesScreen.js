import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';

import Messages from '../components/Messages';

import {getCurrentUser} from 'aws-amplify/auth';
import {DataStore} from 'aws-amplify/datastore';
import {User, Match} from '../models';

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchCurrentUser();
  }, []);

  //useEffect(() => fetchCurrentUser(), []);

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
      setMatches(dbMatches);
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
          console.log('************************** A new matching is waiting');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [me]);

  const fetchMatch = async matchId => {
    DataStore.query(User, u => u.sub.eq(matchId)).then(async dbUsers => {
      if (!dbUsers || !dbUsers.length) {
        return;
      }
      return dbUsers[0];
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.match}>
          {matches.map(match => {
            let matchUser = null;
            console.log('MATCHES', matches);
            if (!match.User1 || !match.User2) {
              if (match.User1ID === me.id) {
                matchUser = fetchMatch(match.User2ID);
                DataStore.save(
                  Match.copyOf(match, updated =>
                    (updated.User1 = me)((updated.User2 = matchUser)),
                  ),
                );
                console.log('trying to update!!!!!!!!!!!!!!!');
              } else {
                matchUser = fetchMatch(match.User1ID);
                DataStore.save(
                  Match.copyOf(match, updated =>
                    (updated.User1 = matchUser)((updated.User2 = me)),
                  ),
                );
                console.log('trying to update!!!!!!!!!!!!');
              }
              return (
                <View style={styles.user} key={match.id}>
                  <Image source={{}} style={styles.image} />
                  <Text style={styles.name}>NEW MATCH!</Text>
                </View>
              );
            } else {
              if (match.User1ID === me.id) {
                matchUser = match.User2;
              } else {
                matchUser = match.User1;
              }
              return (
                <View style={styles.user} key={match.id}>
                  <Image source={{uri: matchUser.image}} style={styles.image} />
                  <Text style={styles.name}>{matchUser.name}</Text>
                </View>
              );
            }
          })}
        </View>
        <Messages />
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
