import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface EventItemProps {
  label?: string;
  content: string;
}

interface SectionContentProps {
  title?: string;
  items: EventItemProps[];
  image?: string;
  showButton?: boolean;
  onButtonPress?: () => void;
}

interface SectionProps {
  data: SectionContentProps;
  index: number;
}

const EventItem: React.FC<{ item: EventItemProps }> = ({ item }) => (
  <View style={styles.itemContainer}>
    {item.label && <Text style={styles.itemLabel}>{item.label}</Text>}
    <Text style={styles.itemContent}>{item.content}</Text>
  </View>
);

const Section: React.FC<SectionProps> = ({ data, index }) => (
  <View key={index} style={styles.sectionContainer}>
    {data.title && <Text style={styles.sectionTitle}>{data.title}</Text>}
    <View style={styles.sectionContent}>
      <FlatList
        data={data.items}
        renderItem={({ item }) => <EventItem item={item} />}
        keyExtractor={(item, idx) => idx.toString()}
      />
      {data.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
      {data.showButton && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Details pressed')}
        >
          <Text style={styles.buttonText}>CHI TIẾT</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const SectionView: React.FC = () => {
  const eventInfo: SectionContentProps[] = [
    {
      title: 'Lịch trình',
      items: [
        { label: 'Địa điểm:', content: 'Hồ Tràm, Vũng Tàu' },
        { label: 'Thời gian:', content: '09:00 AM - 12:00 AM, 12/12/2024' },
        { label: 'Phương tiện di chuyển:', content: 'Xe bus' },
        { label: 'Thời gian:', content: '21:00 - 22:00' },
      ],
      image: 'https://www.shutterstock.com/image-photo/this-highresolution-tropical-beach-background-260nw-2531998807.jpg',
    },
    {
      title: 'Khách sạn',
      items: [
        { label: 'Tên khách sạn:', content: 'Hồng Quỳnh' },
        { label: 'Giờ mở cửa:', content: '06:00 AM - 12:00 AM' },
        { label: 'Địa điểm:', content: '234 Quang Trung, Hồ Chí Minh' },
      ],
      showButton: true,
    },
  ];

  const renderSection = useCallback(
    ({ item, index }: { item: SectionContentProps; index: number }) => <Section data={item} index={index} />,
    []
  );

  return (
    <FlatList
      data={eventInfo}
      renderItem={renderSection}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container} // Đảm bảo nội dung không bị dính sát vào nhau
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemContent: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  imageContainer: {
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0099ff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SectionView;
