import React, { useEffect, useRef } from 'react'
import { View, Image, Animated } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'

const svg = {
    laptop: `<svg width="132" height="67" viewBox="0 0 132 67" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-0.000171661 66.8472H45.0122V60.4817L-0.000171661 60.4817V66.8472Z" fill="#333333"/>
  <path d="M111.227 60.4858H45.0151V66.8513H111.227V60.4858Z" fill="#333333"/>
  <path d="M67.7834 60.486H39.375L59.676 0H88.0843L67.7834 60.486Z" fill="#333333"/>
  <path d="M111.004 60.486H44.9678L65.2687 0H131.305L111.004 60.486Z" fill="#333333"/>
  <path d="M118.149 0C120.66 12.6568 117.908 24.8133 108.827 34.1994C103.101 40.1202 95.7722 44.6788 88.3319 48.1164C80.9842 51.5076 73.3772 54.6857 65.3995 56.2238C59.2564 57.4098 52.6036 57.5395 46.8126 55.1768L44.978 60.486H111.014L131.315 0C131.306 0 118.149 0 118.149 0Z" fill="#767676"/>
  <path d="M90.3428 17.679H69.1338C68.1424 17.679 67.4474 16.6876 67.7903 15.7517L69.699 10.5352C69.9028 9.97 70.4403 9.59937 71.0425 9.59937H92.2515C93.2429 9.59937 93.9379 10.5908 93.595 11.5266L91.6863 16.7431C91.4825 17.3083 90.945 17.679 90.3428 17.679Z" fill="#C2C2C2"/>
  </svg>
  `,
    blue: `<svg width="97" height="39" viewBox="0 0 97 39" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M89.3739 38.4111H21.2151C17.4023 38.4111 14.3047 35.3198 14.3047 31.5007V7.76516C14.3047 3.9523 17.396 0.854736 21.2151 0.854736H89.3739C93.1867 0.854736 96.2843 3.94608 96.2843 7.76516V31.5007C96.2781 35.3198 93.1867 38.4111 89.3739 38.4111Z" fill="#3586FF"/>
  <path d="M17.9815 22.8113L0.615234 31.2207C0.615234 31.2207 19.437 30.9657 19.8848 30.9906L17.9815 22.8113Z" fill="#3586FF"/>
  <g opacity="0.94">
  <path d="M78 9H25C24.4477 9 24 9.44772 24 10C24 10.5523 24.4477 11 25 11H78C78.5523 11 79 10.5523 79 10C79 9.44772 78.5523 9 78 9Z" fill="white"/>
  <path d="M84.863 16.7808H25.3749C24.827 16.7808 24.3828 17.2249 24.3828 17.7729C24.3828 18.3208 24.827 18.7649 25.3749 18.7649H84.863C85.4109 18.7649 85.855 18.3208 85.855 17.7729C85.855 17.2249 85.4109 16.7808 84.863 16.7808Z" fill="white"/>
  <path d="M82.6424 23.7808H25.3749C24.827 23.7808 24.3828 24.2249 24.3828 24.7729C24.3828 25.3208 24.827 25.7649 25.3749 25.7649H82.6424C83.1903 25.7649 83.6345 25.3208 83.6345 24.7729C83.6345 24.2249 83.1903 23.7808 82.6424 23.7808Z" fill="white"/>
  </g>
  </svg>
  `,
    purple: `<svg width="42" height="53" viewBox="0 0 42 53" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M34.4526 39.0927H6.91042C3.09756 39.0927 0 36.0014 0 32.1823V6.91042C0 3.09756 3.09134 0 6.91042 0H34.4526C38.2654 0 41.363 3.09134 41.363 6.91042V32.1823C41.363 36.0014 38.2717 39.0927 34.4526 39.0927Z" fill="#4A40B8"/>
  <path d="M17.4308 37.9573C17.1198 38.2745 4.87891 52.5743 4.87891 52.5743L7.11188 36.7817" fill="#4A40B8"/>
  <g opacity="0.9">
  <path d="M31.5009 10H9.99209C9.44417 10 9 10.4442 9 10.9921C9 11.54 9.44417 11.9842 9.99209 11.9842H31.5009C32.0488 11.9842 32.493 11.54 32.493 10.9921C32.493 10.4442 32.0488 10 31.5009 10Z" fill="white"/>
  <path d="M34.4056 17H9.99209C9.44417 17 9 17.4442 9 17.9921C9 18.54 9.44418 18.9842 9.99209 18.9842H34.4056C34.9535 18.9842 35.3977 18.54 35.3977 17.9921C35.3977 17.4442 34.9535 17 34.4056 17Z" fill="white"/>
  <path d="M31.3018 24H9.99209C9.44417 24 9 24.4442 9 24.9921C9 25.54 9.44417 25.9842 9.99209 25.9842H31.3018C31.8497 25.9842 32.2939 25.54 32.2939 24.9921C32.2939 24.4442 31.8497 24 31.3018 24Z" fill="white"/>
  </g>
  </svg>
  `,
    orange: `<svg width="50" height="27" viewBox="0 0 50 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M34.1502 27H6.84978C3.07038 27 0 24.8649 0 22.2272V4.77279C0 2.13938 3.06421 0 6.84978 0H34.1502C37.9296 0 41 2.13508 41 4.77279V22.2272C41 24.8649 37.9358 27 34.1502 27Z" fill="#FF9900"/>
  <circle cx="11" cy="14" r="2" fill="white"/>
  <circle cx="21" cy="14" r="2" fill="white"/>
  <circle cx="31" cy="14" r="2" fill="white"/>
  <path d="M36.0893 11.086C36.3829 11.4193 49.7504 24.6721 49.7504 24.6721L34.1631 21.2915" fill="#FF9900"/>
  </svg>
  `,
    lamp: `<svg width="120" height="131" viewBox="0 0 120 131" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M112.261 23.188L112.629 21.3333L35.7538 6.08205L35.3859 7.93682L112.261 23.188Z" fill="black"/>
  <path d="M111.017 29.4544L111.385 27.5996L34.5035 12.3472L34.1356 14.202L111.017 29.4544Z" fill="black"/>
  <path d="M108.683 28.07L106.842 27.6387L84.4279 123.308L86.2688 123.739L108.683 28.07Z" fill="black"/>
  <path d="M114.905 29.5182L113.064 29.0869L90.6505 124.756L92.4915 125.188L114.905 29.5182Z" fill="black"/>
  <path d="M9.65463 63.8319C4.36762 63.8319 0.0820312 59.5463 0.0820312 54.2593V35.2945C0.0820312 30.0075 4.36762 25.7219 9.65463 25.7219C14.9416 25.7219 19.2272 30.0075 19.2272 35.2945V54.2593C19.2272 59.5463 14.9416 63.8319 9.65463 63.8319Z" fill="#0E564D"/>
  <path d="M6.93026 44.6369C11.0292 44.5685 15.1282 44.5001 19.2272 44.4441V35.2883C19.2272 30.0013 14.9416 25.7095 9.65463 25.7095C4.36762 25.7095 0.0820312 29.995 0.0820312 35.2883V44.7116C2.36477 44.6058 4.67862 44.6742 6.93026 44.6369Z" fill="#0E564D"/>
  <path d="M10.6997 25.7715C11.5519 27.8054 12.1552 29.9638 12.6031 32.0848C13.5112 36.3828 13.816 40.8052 13.5298 45.1903C13.2499 49.3702 12.4787 53.606 10.7246 57.4375C9.73564 59.6083 8.34235 61.7169 6.51367 63.2905C7.49643 63.6326 8.55384 63.8317 9.65478 63.8317C14.9418 63.8317 19.2274 59.5461 19.2274 54.2591V35.2943C19.2274 30.3556 15.4954 26.294 10.6997 25.7715Z" fill="#098172"/>
  <path d="M22.5363 22.1206H9.58008V24.2914H22.5363V22.1206Z" fill="black"/>
  <path d="M23.278 23.5326L30.8496 13.0186L29.088 11.75L21.5164 22.264L23.278 23.5326Z" fill="black"/>
  <path d="M24.7808 23.0784C24.7808 24.6458 23.5057 25.9209 21.9382 25.9209C20.3708 25.9209 19.0957 24.6458 19.0957 23.0784C19.0957 21.5047 20.3708 20.2358 21.9382 20.2358C23.5119 20.2358 24.7808 21.5047 24.7808 23.0784Z" fill="black"/>
  <path d="M37.6519 14.0802C40.1684 11.5637 40.1684 7.48367 37.6519 4.96718C35.1354 2.4507 31.0554 2.45069 28.5389 4.96718C26.0224 7.48366 26.0224 11.5637 28.5389 14.0802C31.0554 16.5967 35.1354 16.5967 37.6519 14.0802Z" fill="black"/>
  <path d="M33.0986 13.1451C35.0979 13.1451 36.7186 11.5244 36.7186 9.52507C36.7186 7.52577 35.0979 5.90503 33.0986 5.90503C31.0993 5.90503 29.4785 7.52577 29.4785 9.52507C29.4785 11.5244 31.0993 13.1451 33.0986 13.1451Z" fill="#0E564D"/>
  <path d="M110.984 34.3491C115.8 34.3491 119.705 30.4448 119.705 25.6287C119.705 20.8125 115.8 16.9082 110.984 16.9082C106.168 16.9082 102.264 20.8125 102.264 25.6287C102.264 30.4448 106.168 34.3491 110.984 34.3491Z" fill="black"/>
  <path d="M110.985 30.5237C113.689 30.5237 115.88 28.3321 115.88 25.6285C115.88 22.925 113.689 20.7334 110.985 20.7334C108.281 20.7334 106.09 22.925 106.09 25.6285C106.09 28.3321 108.281 30.5237 110.985 30.5237Z" fill="#0E564D"/>
  <path d="M12.994 18.1772H6.1582V27.868H12.994V18.1772Z" fill="black"/>
  <path d="M108.639 130.056H71.1758V126.722C71.1758 122.872 74.2982 119.75 78.1484 119.75H101.66C105.51 119.75 108.633 122.872 108.633 126.722V130.056H108.639Z" fill="black"/>
  </svg>
  `,
}

const SpeakingAnimate = ({}) => {
    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            delay: 300,
        }).start()
    }, [])

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
    const orangeLeft = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(30), -scale(10)],
        extrapolate: 'clamp',
    })
    const orangeTop = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [scale(17), scale(47)],
        extrapolate: 'clamp',
    })
    const purpleTop = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(50), -scale(15)],
        extrapolate: 'clamp',
    })
    const blueRight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(40), 0],
        extrapolate: 'clamp',
    })
    const lampBottom = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(20), scale(10)],
        extrapolate: 'clamp',
    })
    const lampRight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(45), scale(5)],
        extrapolate: 'clamp',
    })
    const laptopBottom = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-scale(45), scale(5)],
        extrapolate: 'clamp',
    })
    const laptopRight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [scale(70), scale(40)],
        extrapolate: 'clamp',
    })

    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image
                source={require('assets/images/speaking-animate/background.jpg')}
                style={{ width: 256, height: 180, zIndex: -1 }}
            />
            <Animated.View
                style={{
                    opacity,
                    left: orangeLeft,
                    top: orangeTop,
                    position: 'absolute',
                }}
            >
                <SvgXml xml={svg.orange} />
            </Animated.View>
            <Animated.View
                style={{ position: 'absolute', top: purpleTop, opacity }}
            >
                <SvgXml xml={svg.purple} />
            </Animated.View>
            <Animated.View
                style={{ position: 'absolute', right: blueRight, opacity }}
            >
                <SvgXml xml={svg.blue} />
            </Animated.View>
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: lampBottom,
                    right: lampRight,
                    opacity,
                }}
            >
                <SvgXml xml={svg.lamp} />
            </Animated.View>
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: laptopBottom,
                    right: laptopRight,
                    opacity,
                }}
            >
                <SvgXml xml={svg.laptop} />
            </Animated.View>
        </View>
    )
}

export default React.memo(SpeakingAnimate)
