import * as React from 'react';
import { render } from 'react-dom';
import {
  NavigationContainer,
  CompositeNavigationProp,
  NavigationHelpers,
  RouteProp,
  InitialState,
} from '../src';
import createStackNavigator, { StackNavigationProp } from './StackNavigator';
import createTabNavigator, { TabNavigationProp } from './TabNavigator';

type StackParamList = {
  first: { author: string };
  second: undefined;
  third: undefined;
};

type TabParamList = {
  fourth: undefined;
  fifth: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Tab = createTabNavigator<TabParamList>();

const First = ({
  navigation,
  route,
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<StackParamList, 'first'>,
    NavigationHelpers<TabParamList>
  >;
  route: RouteProp<StackParamList, 'first'>;
}) => (
  <div>
    <h1>First, {route.params.author}</h1>
    <button type="button" onClick={() => navigation.push('second')}>
      Push second
    </button>
    <button type="button" onClick={() => navigation.push('third')}>
      Push third
    </button>
    <button type="button" onClick={() => navigation.navigate('fourth')}>
      Navigate to fourth
    </button>
    <button
      type="button"
      onClick={() => navigation.navigate('first', { author: 'John' })}
    >
      Navigate with params
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Pop
    </button>
  </div>
);

const Second = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<StackParamList, 'second'>,
    NavigationHelpers<TabParamList>
  >;
}) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);

    return () => clearInterval(timer);
  }, []);

  navigation.setOptions({
    title: `Count ${count}`,
  });

  return (
    <div>
      <h1>Second</h1>
      <button
        type="button"
        onClick={() => navigation.push('first', { author: 'Joel' })}
      >
        Push first
      </button>
      <button type="button" onClick={() => navigation.pop()}>
        Pop
      </button>
    </div>
  );
};

const Fourth = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    TabNavigationProp<TabParamList, 'fourth'>,
    StackNavigationProp<StackParamList>
  >;
}) => (
  <div>
    <h1>Fourth</h1>
    <button type="button" onClick={() => navigation.jumpTo('fifth')}>
      Jump to fifth
    </button>
    <button
      type="button"
      onClick={() => navigation.push('first', { author: 'Jake' })}
    >
      Push first
    </button>
    <button type="button" onClick={() => navigation.goBack()}>
      Go back
    </button>
  </div>
);

const Fifth = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    TabNavigationProp<TabParamList, 'fifth'>,
    StackNavigationProp<StackParamList>
  >;
}) => (
  <div>
    <h1>Fifth</h1>
    <button type="button" onClick={() => navigation.jumpTo('fourth')}>
      Jump to fourth
    </button>
    <button type="button" onClick={() => navigation.push('second')}>
      Push second
    </button>
    <button type="button" onClick={() => navigation.pop()}>
      Pop
    </button>
  </div>
);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

let initialState: InitialState | undefined;

try {
  initialState = JSON.parse(localStorage.getItem(PERSISTENCE_KEY) || '');
} catch (e) {
  // Do nothing
}

function App() {
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator>
        <Stack.Screen
          name="first"
          component={First}
          options={({ route }) => ({
            title: `Foo (${route.params ? route.params.author : ''})`,
          })}
          initialParams={{ author: 'Jane' }}
        />
        <Stack.Screen name="second" options={{ title: 'Bar' }}>
          {props => <Second {...props} />}
        </Stack.Screen>
        <Stack.Screen name="third" options={{ title: 'Baz' }}>
          {() => (
            <Tab.Navigator initialRouteName="fifth">
              <Tab.Screen name="fourth" component={Fourth} />
              <Tab.Screen name="fifth" component={Fifth} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

render(<App />, document.getElementById('root'));
