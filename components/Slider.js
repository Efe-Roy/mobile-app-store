import {View, Image, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselData = [
    {
      id: "01",
      image: require("../assets/slider_1.png"),
    },
    {
      id: "02",
      image: require("../assets/slider_2.png"),
    },
    {
      id: "03",
      image: require("../assets/slider_4.png"),
    },
  ];

  return (
    <View className=''>
        <FlatList
            data={carouselData}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
            }}
            horizontal
            renderItem={(item) => {
                return (
                    <View
                        className='items-center justify-center'
                        key={item.id}
                        style={{
                        width: width - 50,
                        height: 170
                        }}
                    >
                        <Image
                            source={item?.item?.image}
                            style={{ 
                                height: '90%', 
                                width: '90%',
                                borderRadius: 10, 
                            }}
                        />
                    </View>
                );
            }}
        />
        <View className='flex-row justify-center items-center'
            style={{ width: width }}>
            {carouselData.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            width: currentIndex == index ? 50 : 8,
                            height: currentIndex == index ? 10 : 8,
                            borderRadius: currentIndex == index ? 5 : 4,
                            backgroundColor: currentIndex == index ? 'black' : 'gray',
                            marginLeft: 5,
                        }}
                    ></View>
                );
            })}
        </View>
    </View>
  );
}