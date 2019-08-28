import { Easing } from 'react-native-reanimated';
import { TransitionSpec } from '../types';

/**
 * Exact values from UINavigationController's animation configuration.
 */
export const TransitionIOSSpec: TransitionSpec = {
  timing: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

/**
 * Configuration for activity open animation from Android Nougat.
 * See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml
 */
export const FadeInFromBottomAndroidSpec: TransitionSpec = {
  timing: 'timing',
  config: {
    duration: 350,
    easing: Easing.out(Easing.poly(5)),
  },
};

/**
 * Configuration for activity close animation from Android Nougat.
 * See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_close_exit.xml
 */
export const FadeOutToBottomAndroidSpec: TransitionSpec = {
  timing: 'timing',
  config: {
    duration: 150,
    easing: Easing.in(Easing.linear),
  },
};

/**
 * Approximate configuration for activity open animation from Android Pie.
 * See http://androidxref.com/9.0.0_r3/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml
 */
export const RevealFromBottomAndroidSpec: TransitionSpec = {
  timing: 'timing',
  config: {
    duration: 425,
    // This is super rough approximation of the path used for the curve by android
    // See http://androidxref.com/9.0.0_r3/xref/frameworks/base/core/res/res/interpolator/fast_out_extra_slow_in.xml
    easing: Easing.bezier(0.35, 0.45, 0, 1),
  },
};
